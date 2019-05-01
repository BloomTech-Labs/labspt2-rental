import React, { Component } from "react";
import {
  Header,
  Tab,
  Icon,
  Segment,
  Label,
  Menu,
  Checkbox,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import { Link } from "react-router-dom";
import Search from "../shared/Search/Search";
import TaskList from "./TaskList";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.query = {
      page: 1,
      pageSize: 4,
      search: "",
      filter: { status: "overdue" },
      sort: "_id"
    };

    this.state = {
      tabs: [
        { name: "Overdue", color: "red" },
        { name: "Due Today", color: "orange" },
        { name: "Upcoming", color: "green" }
      ],
      filterByCompleted: false
    };
  }

  componentDidMount() {
    const { page, pageSize, sort, filter } = this.query;
    this.props.getTasks({ page, pageSize, sort, filter });
    this.props.fetchTaskCount(filter);
    this.props.fetchUserLog();
    this.props.fetchIncompletedTaskCount();
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchTasks({ ...this.query });
  };

  handleTabChange = (e, data) => {
    const { tabs } = this.state;
    const activeTab = tabs[data.activeIndex].name.toLowerCase();
    this.query.page = 1;
    this.query.filter.status = activeTab;
    this.props.getTasks({ ...this.query });
    this.props.fetchTaskCount(this.query.filter);
  };

  handlePageChange = (event, data) => {
    this.query.page = data.activePage;
    this.props.getTasks({ ...this.query });
  };

  toggleComplete = task => {
    task.completed = task.completed ? false : true;
    this.props.toggleTask(task);
    this.props.fetchIncompletedTaskCount();
  };

  filterTasksByCompleted = () => {
    if (this.state.filterByCompleted === false) {
      this.setState({ filterByCompleted: true });
      this.query.filter.completed = false;
    } else {
      this.setState({ filterByCompleted: false });
      delete this.query.filter.completed;
    }
    const { page, pageSize, sort, filter } = this.query;
    this.props.getTasks({ page, pageSize, sort, filter });
    this.props.fetchTaskCount(this.query.filter);
  };

  render() {
    const { tabs } = this.state;
    const {
      tasks: {
        tasks,
        loading,
        taskCount,
        overdueIncompleted,
        duetodayIncompleted,
        upcomingIncompleted,
        user
      }
    } = this.props;
    const counts = [
      overdueIncompleted,
      duetodayIncompleted,
      upcomingIncompleted
    ];
    const { pageSize, page } = this.query;
    const role = user ? user.role : null;
    let loadingComponent;
    if (loading) {
      loadingComponent = (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    } else {
      loadingComponent = (
        <Dimmer inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <FlexColumn style={{ flexWrap: "wrap", height: "100vh" }}>
        {loadingComponent}
        <FlexRow width="100%" justifyBetween style={{ alignItems: "baseline" }}>
          <Header as="h1">Tasks</Header>
          {role === "owner" ? (
            <Link to="/dashboard/tasks/add">
              <Segment>
                <Icon name="add" />
              </Segment>
            </Link>
          ) : null}
        </FlexRow>

        <FlexRow
          style={{
            alignItems: "baseline",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          <Segment style={{ marginRight: "15px" }}>
            <Checkbox toggle onChange={this.filterTasksByCompleted} />
          </Segment>
          <Header as="h5">Hide Completed</Header>
        </FlexRow>

        <Tab
          style={{ width: "75vw" }}
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map((tab, index) => ({
              menuItem: (
                <Menu.Item key={index}>
                  {tab.name}
                  {counts[index] === 0 ? null : (
                    <Label floating circular color={tab.color}>
                      {counts[index]}
                    </Label>
                  )}
                </Menu.Item>
              ),
              render: () => (
                <Tab.Pane attached={false}>
                  {!tasks ? (
                    <h2>Loading...</h2>
                  ) : (
                    <TaskList
                      status={tab}
                      tasks={tasks}
                      handlePageChange={this.handlePageChange}
                      loading={loading}
                      count={Math.ceil(taskCount / pageSize)}
                      page={page}
                      toggleComplete={this.toggleComplete}
                    />
                  )}
                </Tab.Pane>
              )
            })),
            {
              menuItem: (
                <Search
                  key="A"
                  onChange={this.handleSearchChange}
                  style={{ minWidth: "230px", flexGrow: "1" }}
                />
              )
            }
          ]}
        />
      </FlexColumn>
    );
  }
}

export default Tasks;
