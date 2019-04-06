import React, { Component } from 'react';
import { Header, Tab, Icon, Segment } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../shared/Search/Search";
import TaskList from './TaskList';

class Tasks extends Component {
  constructor(props) {
    super(props);
      this.state = {
        loading: false,
        error: false,
        tabs: ["Overdue", "Due Today", "Upcoming"],
        search: "",
        filter: { status: "due today" }
      };
    }
    
    componentDidMount() {
      // const { filter } = this.state;
      // this.props.getTasks({ filter });
      this.props.getTasks();
    }

    handleSearchChange = value => {
      const search = value || "";
      this.setState({ search });
      // this.props.searchTasks({ filter });
    }

    handleTabChange = (e, data) => {
      const { tabs } = this.state;
      const filter = { status: tabs[data.activeIndex] };
      this.setState({ filter });
      this.props.getTasks({ filter });
      // const filter = { status: tabs[data.activeIndex].toLowerCase() };
      // this.setState({ filter });
      // this.props.getTasks({ filter });
    }

  render () {

    const { tabs } = this.state;
    const { tasks : { tasks, loading } } = this.props;

    return (
      <FlexColumn>
        <FlexRow>
          <Header as="h1">Tasks</Header>
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