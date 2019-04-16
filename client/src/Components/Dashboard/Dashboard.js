import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import { DashboardContent } from "./"
import { Properties, Property, PropertyEdit, PropertyAdd } from "../Properties";
import {
  Reservations,
  ReservationAdd,
  ReservationView,
  ReservationEdit
} from "../Reservations";
import { EmployeeSingle, EmployeeAdd, Employees } from "../Employees";
import { Checkout } from "../Checkout";
import { Tasks, TaskAdd } from "../Tasks";
import { Settings } from "../Settings";
import { Sidebar } from "./components";

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Sidebar location={this.props.location}>
          <Segment
            className="space-left-20"
            style={{ width: "100%", maxWidth: "fit-content" }}
          >
            <Route
              exact
              path="/dashboard"
              render={() => <DashboardContent />}
            />
            <Route
              exact
              path="/dashboard/reservations"
              render={() => <Reservations />}
            />
            <Route
              exact
              path="/dashboard/reservations/add"
              render={() => <ReservationAdd />}
            />
            <Route
              exact
              path="/dashboard/reservations/view/:id"
              render={() => <ReservationView />}
            />
            <Route
              exact
              path="/dashboard/reservations/edit/:id"
              render={() => <ReservationEdit />}
            />
            <Route
              exact
              path="/dashboard/checkout"
              render={() => <Checkout />}
            />
            <Route
              exact
              path="/dashboard/employees"
              render={() => <Employees />}
            />
            <Route
              exact
              path="/dashboard/employees/add"
              render={() => <EmployeeAdd />}
            />
            <Route
              path="/dashboard/employees/:id"
              render={() => <EmployeeSingle />}
            />

            {/*TODO work on these pages*/}

            <Route exact path="/dashboard/tasks" render={() => <Tasks />} />

            <Route
              exact
              path="/dashboard/tasks/add"
              render={() => <TaskAdd />}
            />

            <Route
              exact
              path="/dashboard/properties"
              render={() => <Properties />}
            />
            <Route
              path="/dashboard/properties/:id"
              render={() => <Property />}
            />

            <Route
              exact
              path="/dashboard/properties/edit/:id"
              render={() => <PropertyEdit />}
            />
            <Route
              path="/dashboard/properties/add"
              render={() => <PropertyAdd />}
            />
            {/*<Route path="/dashboard/tasks" render={() => <Tasks/>}/>*/}
            <Route path="/dashboard/settings" render={() => <Settings />} />
          </Segment>
        </Sidebar>
      </Container>
    );
  }
}

export default withRouter(Dashboard);
