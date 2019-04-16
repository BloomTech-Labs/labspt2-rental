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
        <FlexColumn alignCenter width="full">
          <DashboardCards
            title="Reservations"
            iconName="book"
            value1={10}
            label1="Total"
            color1="blue"
            value2={5}
            label2="Active"
            color2="blue"
          />
          <DashboardCards
            title="Properties"
            iconName="home"
            value1={10}
            label1="Total"
            color1="blue"
            value2={5}
            label2="Unreserved"
            color2="blue"
          />
          <DashboardCards
            title="Employees"
            iconName="address card"
            value1={10}
            label1="Total"
            color1="blue"
          />
          <DashboardCards
            title="Tasks"
            iconName="clipboard list"
            value1={10}
            label1="Today"
            color1="blue"
            value2={5}
            label2="Overdue"
            color2="blue"
          />
        </FlexColumn>
      </Container>
    );
  }
}
