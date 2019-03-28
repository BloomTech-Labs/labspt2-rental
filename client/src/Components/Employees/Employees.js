import React, { Component } from "react";
import { Header, Tab, Button } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import EmployeeList from "./EmployeeList";
import Search from "../shared/Search/Search";

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      pageSize: 4,
      sort: "_id",
      search: "",
      loading: true,
      error: false,
      tabs: ["All"],
      employees: []
    };
  }

  componentDidMount() {
    const { filter, page, pageSize, sort } = this.state;
    this.props.getEmployees({ page, pageSize, sort, filter });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      employees: nextProps.employees,
      loading: nextProps.loading,
      error: nextProps.error
    });
  }

  handleSearchChange = value => {
    const { page, pageSize, sort, filter } = this.state;
    const search = value || "";
    this.setState({ search });
    this.props.searchEmployees({ page, pageSize, sort, search, filter });
  };

  handleTabChange = (e, data) => {
    const { page, pageSize, sort, tabs } = this.state;
    const filter = { status: tabs[data.activeIndex].toLowerCase() };
    this.setState({ filter });
    this.props.getEmployees({ page, pageSize, sort, filter });
  };

  render() {
    const { tabs, employees, page, pageSize } = this.state;

    return (
      <FlexColumn>
        <Header as="h1">Employees</Header>
        {this.props.loading ? (
          <div>Loading...Please wait</div>
        ) : (
          <Tab
            onTabChange={this.handleTabChange}
            menu={{ attached: false }}
            panes={[
              ...tabs.map(tab => ({
                menuItem: tab,
                render: () => (
                  <Tab.Pane attached={false}>
                    <EmployeeList
                      status={tab}
                      employees={employees}
                      page={page}
                      pageSize={pageSize}
                    />
                  </Tab.Pane>
                )
              })),
              {
                menuItem: <Search onChange={this.handleSearchChange} />
              }
            ]}
          />
        )}
      </FlexColumn>
    );
  }
}
