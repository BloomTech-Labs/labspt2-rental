import React, { Component } from 'react';
import { Header, Tab, Icon, Segment } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../shared/Search/Search";
import TaskList from './TaskList';

class Tasks extends Component {
  constructor(props) {
    super(props);
      
    this.query = {
        search: "",
        filter: { status: "due today" }, 
        sort: "_id"
      };

    this.state = {
      tabs: ["Overdue", "Due Today", "Upcoming"],
    }
  }
    
    componentDidMount() {
      const { sort, filter } = this.query;
      this.props.getTasks({ sort, filter });
      // this.props.fetchTaskCount("upcoming");
    }

    handleSearchChange = value => {
      this.query.search = value || "";
      this.props.searchTasks({ ...this.query });
    }

    handleTabChange = (e, data) => {
      const { tabs } = this.state;
      const activeTab = tabs[data.activeIndex].toLowerCase();
      this.query.filter = { status: activeTab };
      this.props.getTasks({ ...this.query });
      // this.props.fetchTaskCount(activeTab);
    }

    handlePageChange = (event, data) => {
      this.props.getTasks({ ...this.query });
    }

  render () {

    const { tabs } = this.state;
    const { tasks : { tasks, loading } } = this.props;

    return (
      <FlexColumn>
        <FlexRow width='100%' justifyBetween style={{alignItems: "baseline"}}>
        <Header as="h1">Tasks</Header>
        <Segment style={{marginBottom: "14px"}}>
          <Icon name='add'></Icon>
        </Segment>
        </FlexRow>
      
        <Tab
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map(tab => ({
              menuItem: tab,
              render: () => (
                <Tab.Pane attached={false}>
                  <TaskList 
                    status={tab}
                    tasks={tasks}
                    handlePageChange={this.handlePageChange}
                  />
                </Tab.Pane>
              )
            })),
            {
              menuItem: <Search onChange={this.handleSearchChange} />
            }
          ]}
        />
      </FlexColumn>
    )
  }
}

export default Tasks;