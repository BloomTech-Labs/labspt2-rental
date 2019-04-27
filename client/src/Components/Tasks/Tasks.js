import React, { Component } from "react";
import { Header, Tab, Icon, Segment, Label, Menu , Checkbox} from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import { Link } from "react-router-dom";
import Search from "../shared/Search/Search";
import TaskList from "./TaskList";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.query = {
      page: 1,
      pageSize: 5,
      search: "",
      filter: { status: "overdue" },
      sort: "_id",
    };

    this.state = {
      tabs: [
        {name: "Overdue", color: "red", label: "!"}, 
        {name: "Due Today", color: "orange", label: "!"}, 
        {name: "Upcoming", color: "yellow", label: "!"}
      ],
      filterByCompleted: false
    };
  }

  componentDidMount() {
    const { page, pageSize, sort, filter } = this.query;
    this.props.getTasks({ page, pageSize, sort, filter });
    this.props.fetchTaskCount("overdue");
    this.props.fetchUserLog();
    this.props.fetchIncompletedTaskCount("overdue");
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchTasks({ ...this.query });
  };

  handleTabChange = (e, data) => {
    const { tabs } = this.state;
    const activeTab = tabs[data.activeIndex].name.toLowerCase();
    this.query.page = 1;
    this.query.filter = { status: activeTab };
    this.props.getTasks({ ...this.query });
    this.props.fetchTaskCount(activeTab);
  };

  handlePageChange = (event, data) => {
    this.query.page = data.activePage;
    this.props.getTasks({ ...this.query });
  };

  toggleComplete = task => {
    task.completed = task.completed ? false : true;
    this.props.toggleTask(task);
  };

  filterTasksByCompleted = () => {
    this.setState({ filterByCompleted: true })
  }

  render() {
    const { tabs, filterByCompleted } = this.state;
    const {
        tasks: { 
          tasks, 
          loading, 
          taskCount, 
          incompletedTaskCount, 
          user 
        }
      } = this.props;
    const { pageSize, page } = this.query;
    const role = user ? user.role : null;

    return (
      <FlexColumn>
        <FlexRow width="100%" justifyBetween style={{ alignItems: "baseline" }}>
          <Header as="h1">Tasks</Header>
          {role === "owner" ? (
            <Link to="/dashboard/tasks/add">
            <Segment style={{ marginBottom: "14px" }}>
              <Icon name="add" />
            </Segment>
          </Link>
          ) : null}
        </FlexRow>

        <FlexRow style={{ alignItems: "baseline", marginTop: "-10px", marginBottom: "10px" }}>
          <Segment style={{ marginRight: "15px" }}>
            <Checkbox 
              toggle 
              onChange={this.filterTasksByCompleted}
            />
          </Segment>
          <Header as="h5">Filter by Completed</Header>
        </FlexRow>

        {incompletedTaskCount}
        <br/>
        {taskCount}
        <br/>
        <Tab
          style={{ width: "75vw"}}
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map(tab => ({
              menuItem: (
                <Menu.Item>
                  {tab.name}
                  <Label 
                    floating 
                    circular 
                    color={tab.color}
                  >
                    {tab.label}
                  </Label>
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
                  onChange={this.handleSearchChange}
                  style={{ minWidth: "300px", flexGrow: "1" }}
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
