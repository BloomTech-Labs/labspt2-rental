import React, { Component } from "react";
// import { Route, Link, withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import Card from "../shared/Card/Card";

class EmployeeSingle extends Component {
  constructor(props) {
    super(props);
    this.loading = true;
  }

  componentDidMount() {
    console.log(this.props);
    if (!this.props.employees.length) {
      console.log("I'm here to help!");
      const query = {
        page: 1,
        pageSize: 10000,
        sort: "_id",
        search: ""
      };
      this.props.getEmployees({ ...query });
    }
  }

  componentDidUpdate() {
    if (this.props.employees.length) {
      console.log("this should work now");
      this.loading = false;
    }
  }

  render() {
    const id = this.props.match.params.id;
    const employee = this.props.employees.find(item => item._id === id);
    console.log(employee);

    return (
      <Container>
        {this.loading ? null : <div>{employee.firstName}</div>}
      </Container>
    );
  }
}

export default EmployeeSingle;
