import React, { Component } from "react";
import { FlexColumn, Container } from "custom-components";

import DashboardCards from "./DashboardCards";

export default class DashboardContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEverything();
  }

  render() {
    const {
      reservTotals,
      reservActive,
      propTotal,
      propInactive,
      emplTotal,
      tasksToday,
      tasksOverdue
    } = this.props;

    // this sets the color of the overdue label to red if any exist
    let overdueColor = "blue";
    if (tasksOverdue) overdueColor = "red";

    // this sets the color of unreserved properties label to yellow if any exist and red if more than 50% of total exist
    let propInactiveColor = "blue";
    if (propInactive) {
      if (propInactive >= propTotal / 2) {
        propInactiveColor = "red";
      } else propInactiveColor = "yellow";
    }

    // this sets the color of the active reservations and total reservations labels to red if none exist
    let reservTotalsColor = "blue";
    let reservActiveColor = "blue";
    if (!reservTotals) reservTotalsColor = "red";
    if (!reservActive) reservActiveColor = "red";

    return (
      <Container>
        <FlexColumn alignCenter width="full">
          <DashboardCards
            title="Reservations"
            iconName="book"
            value1={reservTotals}
            label1="Total"
            color1={reservTotalsColor}
            value2={reservActive}
            label2="Active"
            color2={reservActiveColor}
          />
          <DashboardCards
            title="Properties"
            iconName="home"
            value1={propTotal}
            label1="Total"
            color1="blue"
            value2={propInactive}
            label2="Unreserved"
            color2={propInactiveColor}
          />
          <DashboardCards
            title="Employees"
            iconName="address card"
            value1={emplTotal}
            label1="Total"
            color1="blue"
          />
          <DashboardCards
            title="Tasks"
            iconName="clipboard list"
            value1={tasksToday}
            label1="Today"
            color1="blue"
            value2={tasksOverdue}
            label2="Overdue"
            color2={overdueColor}
          />
        </FlexColumn>
      </Container>
    );
  }
}
