import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { Segment, Menu, Sidebar, Icon, Header, Image } from 'semantic-ui-react'
import { FlexRow, Container } from 'custom-components'
import { Reservations } from '../Reservations'
import { Checkout } from '../Reservations'
import { EmployeeList } from '../Employees'
import { Tasks } from '../Tasks'


class Dashboard extends Component {
  constructor (props) {
    super(props)

    let currentRoute = props.location.pathname.slice(11, props.location.pathname.length) // Grab the name of the current route
    currentRoute = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1) // Capitalize the first letter

    this.state = {
      active: currentRoute // Set active menu item to current route
    }

    this.links = [
      { url: `/dashboard/reservations`, name: 'Reservations', icon: 'book' },
      { url: `/dashboard/checkout`, name: 'Checkout', icon: 'cart' },
      { url: `/dashboard/properties`, name: 'Properties', icon: 'home' },
      { url: `/dashboard/employees`, name: 'Employees', icon: 'address card' },
      { url: `/dashboard/tasks`, name: 'Tasks', icon: 'tasks' },
      { url: `/dashboard/settings`, name: 'Settings', icon: 'setting' },
    ]
  }

  handleClick = ev => {
    this.setState({ active: ev.target.innerHTML })
  }

  render () {
    const { active } = this.state

    return (
      <Container>
        <Sidebar.Pushable style={{width: "100%"}}>
          <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
            {this.links.map((link, ind) => (
              <Link key={ind} to={link.url} onClick={this.handleClick}>
                <Menu.Item as='a'>
                  <Icon name={link.icon}/>
                  {link.name}
                </Menu.Item>
              </Link>
            ))}

          </Sidebar>

          <Sidebar.Pusher as={Segment} style={{marginLeft: "140px"}}>
              <Segment className="space-left-20" >
                <Route path="/dashboard/reservations" render={() => <Reservations/>}/>
                <Route path="/dashboard/employees" render={props => <EmployeeList {...props}/>}/>
                {/*TODO work on these pages*/}
                <Route path="/dashboard/checkout" render={() => <Checkout/>}/>
                {/*<Route path="/dashboard/properties" render={() => <Properties/>}/>*/}
                <Route path="/dashboard/tasks" render={() => <Tasks/>}/>
                {/*<Route path="/dashboard/settings" render={() => <Settings/>}/>*/}
              </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    )
  }
}

export default withRouter(Dashboard)