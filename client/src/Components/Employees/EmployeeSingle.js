import React, { Component } from "react";
// import { Route, Link, withRouter } from "react-router-dom";
import { Button, Icon, Image, Header } from "semantic-ui-react";
import { FlexRow, Container, FlexColumn } from "custom-components";
import Card from "../shared/Card/Card";

import taskPropertyAssign from "./taskPropertyHelper";

class EmployeeSingle extends Component {
  constructor(props) {
    super(props);
    this.loading = true;
  }

  componentDidMount() {
    if (!this.props.employees.length) {
      const query = {
        page: 1,
        pageSize: 10000,
        sort: "_id",
        search: ""
      };
      this.props.getEmployees({ ...query });
    }
  }

  render() {
    const employees = taskPropertyAssign({
      employees: this.props.employees,
      tasks: this.props.tasks,
      properties: this.props.properties
    });
    const id = this.props.match.params.id;
    const employee = employees.find(item => item._id === id);
    console.log("1",employee);
    console.log("2",employees);
    if (employee) {
      this.loading = false;
    }

    return (
      <Container>
        {this.loading ? (
          <div>Please wait...</div>
        ) : (
          <FlexRow justifyAround alignCenter width="full">
            <FlexColumn alignStart>
              <Header as="h1">
                {" "}
                {employee.firstName} {employee.lastName}{" "}
              </Header>
              <br />
              <br />
              <br />
              <Header as="h3"> Email: {employee.email} </Header>
              <Header as="h3"> Phone: {employee.phone} </Header>
              <br />
              <Header as="h3">Today's Tasks: {employee.todayTask}</Header>
              <Header as="h3">Overdue Tasks: {employee.overdue}</Header>
            </FlexColumn>
            {employee.imageLoc ? (
              <Image src={employee.imageLoc} size="medium" />
            ) : (
              <Icon
                className="space-left-20"
                name="user circle"
                size="massive"
              />
            )}
          </FlexRow>
        )}
      </Container>
    );
  }
}

export default EmployeeSingle;
