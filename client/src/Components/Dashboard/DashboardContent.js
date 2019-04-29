import React, { Component } from "react";
import { FlexColumn, Container, FlexRow } from "custom-components";
import { Divider, Header, Icon, List, Image, Segment, Dimmer, Tab, Loader } from 'semantic-ui-react';
import DashboardCards from "./DashboardCards";
import { DashboardStats } from './DashboardStats';
import { EmployeeList } from './EmployeeList';

export default class DashboardContent extends Component {
  componentDidMount() {
    this.props.getEverything();
    this.props.getUserRole();
    this.props.dashboardGetEmployees();
  }

  render() {
    const {
      reservTotals,
      reservActive,
      propTotal,
      propInactive,
      emplTotal,
      tasksToday,
      tasksOverdue,
      propertiesWithoutReservations,
      employees,
      loading
    } = this.props;

    // this sets the color of the overdue label to red if any exist
    let overdueColor = "blue";
    if (tasksOverdue) overdueColor = "red";

    // this sets the color of unreserved properties label to yellow if any exist and red if more than 50% of total exist
    let propInactiveColor = "blue";
    let inactiveHomeText = "None of the homes are unreserved";
    if (propInactive) {
      if (propInactive >= propTotal / 2) {
        propInactiveColor = "red";
        inactiveHomeText = "50% or more homes are unreserved";
      } else {
        propInactiveColor = "yellow";
        inactiveHomeText = "Some of the homes are unreserved";
      }
    }

    // this sets the color of the active reservations and total reservations labels to red if none exist
    let reservTotalsColor = "blue";
    let reservActiveColor = "blue";
    if (!reservTotals) reservTotalsColor = "red";
    if (!reservActive) reservActiveColor = "red";
    console.log(this.props.propertiesWithoutReservations)

    let loadingSpinner;
    if (loading) {
      loadingSpinner = (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Tab menu={{ attached: false }} panes={this.panes} />
        </Segment>
      );
    } else {
      loadingSpinner = (<Container>
      <FlexColumn alignCenter width="full">

      {/* Welcome NAME and SVG */}

      <DashboardStats reservTotals={reservTotals} tasksOverdue={tasksOverdue} tasksToday={tasksToday} />

      <FlexRow justifyAround style={{ width: '100%', marginTop: '2em', marginBottom: '2em'}}>
        <EmployeeList employees={employees}/>
        <EmployeeList employees={employees}/>
      </FlexRow>
      </FlexColumn>
    </Container>)
    }

    return <React.Fragment>{loadingSpinner}</React.Fragment>;
  }
}