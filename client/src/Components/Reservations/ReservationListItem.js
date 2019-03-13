import React from 'react'
import { Image, Header, Statistic, Label } from 'semantic-ui-react'
import { FlexRow, FlexColumn } from 'custom-components'

const ReservationListItem = () => {
  return (
    <FlexRow alignCenter justifyBetween style={{width: "650px"}}>
      <Image rounded src='https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/05/22224952/beagle-puppy-in-large-cushion-chair.jpg' size='small' />

      <FlexColumn className="space-left-20">
        <Header size='medium'>Guest Name</Header>
        <Label color='red' horizontal>House 1</Label>
      </FlexColumn>

      <Statistic size="tiny" className="space-left-20">
        <Statistic.Label>Check-in</Statistic.Label>
        <Statistic.Value>1/27</Statistic.Value>
      </Statistic>

      <Statistic size="tiny" className="space-left-20">
        <Statistic.Label>Check-out</Statistic.Label>
        <Statistic.Value>1/30</Statistic.Value>
      </Statistic>

      <Statistic color="yellow" size="small" className="space-left-20">
        <Statistic.Label>Status</Statistic.Label>
        <Statistic.Value>50%</Statistic.Value>
      </Statistic>
    </FlexRow>
  )
}

export default ReservationListItem