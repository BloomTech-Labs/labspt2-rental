import React, { Component } from 'react'
import { Header, Tab } from 'semantic-ui-react'
import { FlexColumn } from 'custom-components'
import ReservationList from './ReservationList'

export default class Reservations extends Component {
  constructor () {
    super()

    this.panes = [
      { menuItem: 'Upcoming', render: () => <Tab.Pane attached={false}><ReservationList status="upcoming"/></Tab.Pane> },
      { menuItem: 'Incomplete', render: () => <Tab.Pane attached={false}><ReservationList status="incomplete"/></Tab.Pane> },
      { menuItem: 'Complete', render: () => <Tab.Pane attached={false}><ReservationList status="complete"/></Tab.Pane> },
    ]
  }

  render () {
    return (
      <FlexColumn>
        <Header as='h1'>Reservations</Header>
        <Tab menu={{ attached: false }} panes={this.panes}/>
      </FlexColumn>
    )
  }
}