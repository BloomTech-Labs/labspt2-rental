import React, { Component } from "react";
import {connect} from 'react-redux'
import { Header, Tab, Button } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import EmployeeList from "./EmployeeList";
import Search from "../shared/Search/Search";
import { getEmployees, searchEmployees } from "./actionCreator";

class Employees extends Component {
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
    const { page, pageSize, sort } = this.state;
    this.props.getEmployees({ page, pageSize, sort });
  }

  handleSearchChange = value => {
    const { page, pageSize, sort, filter } = this.state;
    const search = value || "";
    this.setState({ search });
    this.props.searchEmployees({ page, pageSize, sort, search });
  };

  handleTabChange = (e) => {
    this.setState({
      page: 1,
      pageSize: 4,
      sort: "_id",
     });
    const { page, pageSize, sort } = this.state;
    this.props.getEmployees({ page, pageSize, sort });
  };

  render() {
    const { tabs, page, pageSize } = this.state;
    const { employees } = this.props

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

const mapStateToProps = state => {
  return {
    employees: state.employees.employees,
    loading: state.employees.loading,
    error: state.employees.error
  };
};

export default connect(
  mapStateToProps,
  { getEmployees, searchEmployees }
)(Employees);