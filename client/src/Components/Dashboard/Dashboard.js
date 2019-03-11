import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { Segment, Menu } from 'semantic-ui-react'
import { FlexRow, Container } from 'custom-components'
import { Reservations } from '../Reservations'

class Dashboard extends Component {
  constructor (props) {
    super(props);

    let currentRoute = props.location.pathname.slice(11, props.location.pathname.length) // Grab the name of the current route
    currentRoute = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1); // Capitalize the first letter

    this.state = {
      active: currentRoute // Set active menu item to current route
    }

    this.links = [
      { url: `/dashboard/reservations`, name: 'Reservations' },
      { url: `/dashboard/checkout`, name: 'Checkout' },
      { url: `/dashboard/properties`, name: 'Properties' },
      { url: `/dashboard/tasks`, name: 'Tasks' },
      { url: `/dashboard/settings`, name: 'Settings' },
    ]
  }

  handleClick = ev => {
    this.setState({ active: ev.target.innerHTML })
  }

  render () {
    const { active } = this.state

    return (
      <Container padding>
        <Segment style={{ width: '100%' }}>
          <FlexRow>
            <div style={{ width: '200px' }}>
              <Menu color="green" fluid vertical tabular style={{ borderColor: "#35ba45"}}> {/*Border color can be set in the theme if we like it*/}
                {this.links.map((link, ind) => (
                  <Link key={ind} to={link.url} onClick={this.handleClick}>
                    <Menu.Item name={link.name} active={active === link.name}/>
                  </Link>
                ))}
              </Menu>
            </div>


            <FlexRow grow="1">
              <Segment className="space-left-20" style={{ width: '100%' }}>
                <Route path="/dashboard/reservations" render={() => <Reservations/>}/>
                {/*TODO work on these pages*/}
                {/*<Route path="/dashboard/checkout" render={() => <Checkout/>}/>*/}
                {/*<Route path="/dashboard/properties" render={() => <Properties/>}/>*/}
                {/*<Route path="/dashboard/tasks" render={() => <Tasks/>}/>*/}
                {/*<Route path="/dashboard/settings" render={() => <Settings/>}/>*/}
              </Segment>
            </FlexRow>
          </FlexRow>
        </Segment>
      </Container>
    )
  }
}

export default withRouter(Dashboard)