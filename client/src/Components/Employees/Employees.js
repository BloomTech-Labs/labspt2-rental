import React, { Component } from "react";
import { Header, Tab } from "semantic-ui-react";
import { FlexColumn } from "custom-components";
import EmployeeList from "./EmployeeList";
import Search from "../shared/Search/Search";

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: ["All"]
    };

    this.query = {
      page: 1,
      pageSize: 4,
      sort: "_id",
      search: ""
    };
  }

  componentDidMount() {
    this.props.getEmployees({ ...this.query });
    this.props.getNumberEmployees({ ...this.query });
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchEmployees({ ...this.query });
    this.props.getNumberEmployees({ ...this.query });
  };

  handleTabChange = e => {
    this.query = {
      page: 1,
      pageSize: 4,
      sort: "_id"
    };
    this.props.getEmployees({ ...this.query });
    this.props.getNumberEmployees({ ...this.query });
  };

  handlePageChange = (e, data) => {
    this.query.page = data.activePage;
    this.props.getEmployees({ ...this.query });
  };

  render() {
    const { tabs } = this.state;
    const { page, pageSize } = this.query;
    const { employees, loading, numPages, tasks, properties } = this.props;

    return (
      <FlexColumn>
        <Header as="h1">Employees</Header>
        <Tab
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map((tab, index) => ({
              menuItem: tab,
              render: () => (
                <Tab.Pane attached={false}>
                  <EmployeeList
                    key={tab + index}
                    status={tab}
                    employees={employees}
                    tasks={tasks}
                    properties={properties}
                    page={page}
                    pageSize={pageSize}
                    numPages={numPages}
                    handlePageChange={this.handlePageChange}
                  />
                </Tab.Pane>
              )
            })),
            {
              menuItem: <Search key="1" onChange={this.handleSearchChange} />
            }
          ]}
        />
      </FlexColumn>
    );
  }
}
