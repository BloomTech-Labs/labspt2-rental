import React, { Component } from "react";
import { Header, Tab } from "semantic-ui-react";
import { FlexColumn, Container } from "custom-components";

import DashboardCards from "./DashboardCards";

export default class DashboardContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <DashboardCards title="Reservations" iconName="book" />
        <DashboardCards title="Properties" iconName="home" />
        <DashboardCards title="Employees" iconName="address card" />
        <DashboardCards title="Overdue Tasks" iconName="warning sign" />
        <DashboardCards title="Today's Tasks" iconName="clipboard list" />
      </Container>
    );
  }
}
