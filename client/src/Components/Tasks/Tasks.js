import React, { Component } from "react";
import { Header, Tab, Icon, Segment, Label } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import { Link } from 'react-router-dom';
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
      sort: "_id"
    };

    this.state = {
      tabs: ["Overdue", "Due Today", "Upcoming"]
    };
  }

  componentDidMount() {
    const { page, pageSize, sort, filter } = this.query;
    this.props.getTasks({ page, pageSize, sort, filter });
    this.props.fetchTaskCount("overdue");
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchTasks({ ...this.query });
  };

  handleTabChange = (e, data) => {
    const { tabs } = this.state;
    const activeTab = tabs[data.activeIndex].toLowerCase();
    this.query.page = 1;
    this.query.filter = { status: activeTab };
    this.props.getTasks({ ...this.query });
    this.props.fetchTaskCount(activeTab);
  }

  handlePageChange = (event, data) => {
    this.query.page = data.activePage;
    this.props.getTasks({ ...this.query });
  };

  render() {
    const { tabs } = this.state;
    const {
      tasks: { tasks, loading, taskCount }
    } = this.props;
    const { pageSize, page } = this.query;

    return (
      <FlexColumn>
        <FlexRow width="100%" justifyBetween style={{ alignItems: "baseline" }}>
          <Header as="h1">Tasks</Header>
          <Link to="/dashboard/tasks/add">
            <Segment style={{ marginBottom: "14px" }}>
              <Icon name="add" />
            </Segment>
          </Link>
        </FlexRow>

        {/* <Label color='red' circular>{taskCount}</Label>
        <Label color='red' circular>{pageSize}</Label> */}

        <Tab
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map(tab => ({
              menuItem: tab,
              render: () => (
                <Tab.Pane attached={false}>
                {!tasks ? 
                <h2>Loading...</h2>
                :
                <TaskList
                    status={tab}
                    tasks={tasks}
                    handlePageChange={this.handlePageChange}
                    loading={loading}
                    count={Math.ceil(taskCount / pageSize)}
                    page={page}
                  />
                }
                </Tab.Pane>
              )
            })),
            {
              menuItem: <Search onChange={this.handleSearchChange} />
            }
          ]}
        />
      </FlexColumn>
    );
  }
}

export default Tasks;
