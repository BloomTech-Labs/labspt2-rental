import React, { Component } from 'react'
import { Divider, Header, Tab } from 'semantic-ui-react'
import { FlexColumn, FlexRow } from 'custom-components'
import ReservationListItem from './ReservationListItem'

export default class ReservationList extends Component {
  constructor () {
    super()

  }

  render () {
    const { status } = this.props

    return (
      <FlexColumn>
        <ReservationListItem/> {/*Here we'll map each item from data fetched from the server and filter by status*/}
      </FlexColumn>
    )
  }
}