import React, { Component } from "react";
// import { Route, Link, withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import Card from "../shared/Card/Card";

class EmployeeSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return <Container>{/* <div>this.state.name</div> */}</Container>;
  }
}

export default EmployeeSingle;
