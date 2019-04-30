import React, { Component } from "react";
import { FlexColumn, Container, FlexRow } from "custom-components";
import { Responsive, Segment, Dimmer, Tab, Loader } from 'semantic-ui-react';
import { DashboardStats } from './DashboardStats';
import { EmployeeList } from './EmployeeList';
import { WelcomeMessage } from './WelcomeMessage';

export default class DashboardContent extends Component {
  componentDidMount() {
    this.props.getEverything();
    this.props.getUserRole();
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
      employeeTasks,
      employees,
      loading,
      user
    } = this.props;

    console.log(user)

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

    getWidth();
    let container;
    if (getWidth() < Responsive.onlyTablet.minWidth) {
        container = ( <FlexColumn alignCenter style={{ width: '100%', marginTop: '2em', marginBottom: '2em'}}>
        <EmployeeList mobile={true} employeeTasks={employeeTasks} employees={employees}/>
        <EmployeeList mobile={true} employeeTasks={employeeTasks} employees={employees}/>
      </FlexColumn>)
    } else if (getWidth() > Responsive.onlyMobile.maxWidth) {
        container = ( <FlexRow justifyAround style={{ width: '100%', marginTop: '2em', marginBottom: '2em'}}>
        <EmployeeList mobile={false} employeeTasks={employeeTasks} employees={employees}/>
        <EmployeeList mobile={false} employeeTasks={employeeTasks} employees={employees}/>
      </FlexRow> )
    }

    let welcomeMobile;
    if (getWidth() < Responsive.onlyTablet.minWidth){
      welcomeMobile = true;
    } else if (getWidth() > Responsive.onlyMobile.maxWidth){
      welcomeMobile = false;
    }

    let loadingSpinner;
    if (loading) {
      loadingSpinner = (
        <Container width="full" style={{display: 'flex' }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Tab menu={{ attached: false }} panes={this.panes} />
        </Container>
      );
    } else {
      loadingSpinner = (<Container>
      <FlexColumn alignCenter width="full">

      <WelcomeMessage user={user} mobile={welcomeMobile} />

      <DashboardStats reservTotals={reservTotals} tasksOverdue={tasksOverdue} tasksToday={tasksToday} />

      {container}
      </FlexColumn>
    </Container>)
    }

    return <React.Fragment>{loadingSpinner}</React.Fragment>;
  }
}

const getWidth = () => {
  const isSSR = typeof window === "undefined";  
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};