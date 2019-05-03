import React, { Component } from "react";
import { FlexColumn, Container, FlexRow } from "custom-components";
import { Responsive, Dimmer, Tab, Loader } from "semantic-ui-react";
import { DashboardStats } from "./DashboardStats";
import { EmployeeList } from "./EmployeeList";
import { WelcomeMessage } from "./WelcomeMessage";
import { PropertyStats } from "./PropertyStats";

export default class DashboardContent extends Component {
  componentDidMount() {
    this.props.getEverything();
    this.props.getUserRole();
  }

  render() {
    const {
      reservTotals,
      propTotal,
      tasksToday,
      tasksOverdue,
      propertiesWithoutReservations,
      employeeTasks,
      employees,
      loading,
      user
    } = this.props;

    getWidth();
    let container;
    if (getWidth() < Responsive.onlyTablet.minWidth) {
      container = (
        <FlexColumn alignCenter style={{ width: "100%", marginTop: "1em" }}>
          <EmployeeList
            mobile={true}
            employeeTasks={employeeTasks}
            employees={employees}
          />
          <PropertyStats
            mobile={true}
            propTotal={propTotal}
            noReservations={propertiesWithoutReservations}
          />
        </FlexColumn>
      );
    } else if (getWidth() > Responsive.onlyMobile.maxWidth) {
      container = (
        <FlexRow
          justifyAround
          style={{ width: "100%", marginTop: "2em", marginBottom: "2em" }}
        >
          <EmployeeList
            mobile={false}
            employeeTasks={employeeTasks}
            employees={employees}
          />
          <PropertyStats
            mobile={false}
            propTotal={propTotal}
            noReservations={propertiesWithoutReservations}
          />
        </FlexRow>
      );
    }

    let welcomeMobile;
    if (getWidth() < Responsive.onlyTablet.minWidth) {
      welcomeMobile = true;
    } else if (getWidth() > Responsive.onlyMobile.maxWidth) {
      welcomeMobile = false;
    }

    let loadingSpinner;
    if (loading) {
      loadingSpinner = (
        <Container width="full" style={{ display: "flex" }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Tab menu={{ attached: false }} panes={this.panes} />
        </Container>
      );
    } else {
      loadingSpinner = (
        <Container>
          <FlexColumn alignCenter width="full">
            <WelcomeMessage user={user} mobile={welcomeMobile} />

            <DashboardStats
              reservTotals={reservTotals}
              tasksOverdue={tasksOverdue}
              tasksToday={tasksToday}
            />

            {container}
          </FlexColumn>
        </Container>
      );
    }

    return <React.Fragment>{loadingSpinner}</React.Fragment>;
  }
}

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
