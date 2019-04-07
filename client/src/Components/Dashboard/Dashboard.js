import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { Segment, Menu, Sidebar, Icon, Header, Image } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import { Properties, Property } from "../Properties";
import {
  Reservations,
  ReservationAdd,
  ReservationView,
  ReservationEdit
} from "../Reservations";
import { EmployeeSingle } from "../Employees";
import Employees from "../Employees/container";
import { Checkout } from "../Checkout";
import { Tasks } from "../Tasks";
import { Settings } from "../Settings";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    let currentRoute = props.location.pathname.slice(
      11,
      props.location.pathname.length
    ); // Grab the name of the current route
    currentRoute = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1); // Capitalize the first letter

    this.state = {
      active: currentRoute // Set active menu item to current route
    };

    this.links = [
      { url: `/dashboard/reservations`, name: "Reservations", icon: "book" },
      { url: `/dashboard/properties`, name: "Properties", icon: "home" },
      { url: `/dashboard/employees`, name: "Employees", icon: "address card" },
      { url: `/dashboard/tasks`, name: "Tasks", icon: "tasks" },
      { url: `/dashboard/settings`, name: "Settings", icon: "setting" }
    ];
  }

  handleClick = ev => {
    this.setState({ active: ev.target.innerHTML });
  };

  render() {
    const { active } = this.state;

    return (
      <Container>
        <Sidebar.Pushable style={{ width: "100%" }}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible
            width="thin"
          >
            {this.links.map((link, ind) => (
              <Link key={ind} to={link.url} onClick={this.handleClick}>
                <Menu.Item as="a">
                  <Icon name={link.icon} />
                  {link.name}
                </Menu.Item>
              </Link>
            ))}
          </Sidebar>

          <Sidebar.Pusher as={Segment} style={{ marginLeft: "140px" }}>
            <FlexRow width="full" justifyCenter>
              <Segment
                className="space-left-20"
                style={{ width: "fit-content" }}
              >
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
                  path="/dashboard/employees"
                  render={() => <Employees />}
                />
                <Route
                  path="/dashboard/employees/:id"
                  render={() => <EmployeeSingle />}
                />

                {/*TODO work on these pages*/}

                <Route path="/dashboard/tasks" render={() => <Tasks />} />

                <Route
                  path="/dashboard/properties"
                  render={() => <Properties />}
                />
                <Route
                  path="/dashboard/properties/:id"
                  render={() => <Property />}
                />
                {/*<Route path="/dashboard/tasks" render={() => <Tasks/>}/>*/}
                <Route path="/dashboard/settings" render={() => <Settings />} />
              </Segment>
            </FlexRow>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

export default withRouter(Dashboard);
