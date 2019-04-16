import React, { Component } from "react";
import { Header, Tab } from "semantic-ui-react";
import { FlexColumn, Container } from "custom-components";

import DashboardCards from "./DashboardCards";

export default class DashboardContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counts: {
        reservTotals: 0,
        reservActive: 0,
        propTotal: 0,
        propInactive: 0,
        emplTotal: 0,
        tasksToday: 0,
        tasksOverdue: 0
      }
    };
  }

  componentDidMount() {
    // get total number of reservations - reservation total and active and properties unreserved
    // get total number of properties - just total
    // get total number of employees - just total
    // get total number of tasks - tasks overdue and due today
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
    } = this.state.counts;
    
    console.log(this.props)

    return (
      <Container>
        <FlexColumn alignCenter width="full">
          <DashboardCards
            title="Reservations"
            iconName="book"
            value1={reservTotals}
            label1="Total"
            color1="blue"
            value2={reservActive}
            label2="Active"
            color2="blue"
          />
          <DashboardCards
            title="Properties"
            iconName="home"
            value1={propTotal}
            label1="Total"
            color1="blue"
            value2={propInactive}
            label2="Unreserved"
            color2="blue"
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
            color2="blue"
          />
        </FlexColumn>
      </Container>
    );
  }
}
