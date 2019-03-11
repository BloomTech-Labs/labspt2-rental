import React, { Component } from 'react'
import { Divider, Header, Tab } from 'semantic-ui-react'
import { FlexColumn, FlexRow } from 'custom-components'
import ReservationListItem from './ReservationListItem'

export default class ReservationList extends Component {
  constructor() {
    super();

  }

  render () {
    return (
      <FlexColumn>
        <ReservationListItem/>
      </FlexColumn>
    )
  }
}