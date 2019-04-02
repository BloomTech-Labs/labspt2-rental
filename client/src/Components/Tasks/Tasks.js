import React, { Component } from 'react';
import { Header, Tab } from "semantic-ui-react";
import { FlexColumn } from "custom-components";
import Search from "../shared/Search/Search";
import TaskList from './TaskList';
// import TaskPageTop from './TaskPageTop';

class Tasks extends Component {
  constructor(props) {
    super(props);
      this.state = {
        tasks: [],
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

    componentWillRecieveProps(nextProps) {
      this.setState({
        tasks: nextProps.tasks,
        loading: nextProps.loading,
        error: nextProps.error
      });
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

    const { tabs, tasks } = this.state;

    return (
      <FlexColumn>
        <Header as="h1">Tasks</Header>
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
        {/* <TaskPageTop />
        <TaskList 
          style={{ margin: "20px" }}
        /> */}
      </FlexColumn>
    )
  }
}

export default Tasks;