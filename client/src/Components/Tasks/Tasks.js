import React, { Component } from "react";
import {
  Header,
  Tab,
  Icon,
  Segment,
  Label,
  Menu,
  Checkbox,
  Button
} from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import { Link } from "react-router-dom";
import Search from "../shared/Search/Search";
import TaskList from "./TaskList";
import styled from "styled-components";

const DesktopButton = styled.button`
  &&& {
    margin: 0;
    @media (max-width: 420px) {
      display: none;
    }
  }
`;

const MobileButton = styled.button`
  &&& {
    margin: 0;
    @media (min-width: 421px) {
      display: none;
    }
  }
`;

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.query = {
      page: 1,
      pageSize: 5,
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

  toggleComplete = (task) => {
    task.completed = task.completed ? false : true;
    this.props.toggleTask(task)
      .then(() => {
        this.props.fetchIncompletedTaskCount()
      }
      );
  };

  filterTasksByCompleted = () => {
    this.query.page = 1;
    const { page, pageSize, sort, filter } = this.query;

    if (this.state.filterByCompleted === false ) {
      this.setState({ filterByCompleted: true })
      this.query.filter.completed = false
    } else {
      this.setState({ filterByCompleted: false })
      delete this.query.filter.completed
    }
    this.props.getTasks({ page, pageSize, sort, filter });
    this.props.fetchTaskCount(this.query.filter);
  }

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
    const counts = [overdueIncompleted, duetodayIncompleted, upcomingIncompleted]
    const { pageSize, page } = this.query;
    const role = user ? user.role : null;

    return (
      <FlexColumn style={{flexWrap: "wrap"}}>
        <FlexRow width="full" justifyBetween alignCenter spaceBottom>
          <Header as="h1" style={{ margin: 0 }}>
            Tasks
          </Header>
          <Button
            as={DesktopButton}
            color="orange"
            onClick={() =>
              this.props.history.push("/dashboard/tasks/add")
            }
          >
            Create Task
          </Button>
          <Button
            as={MobileButton}
            color="orange"
            onClick={() =>
              this.props.history.push("/dashboard/tasks/add")
            }
          >
            Create
          </Button>
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
          style={{ width: "75vw", border: "1px solid red" }}
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map((tab, index) => ({
              menuItem: (
                <Menu.Item key={index}>
                  {tab.name}
                  { counts[index] === 0 ? (
                    null
                  ) : (
                    <Label 
                    floating 
                    circular
                    color={tab.color}
                  >
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
