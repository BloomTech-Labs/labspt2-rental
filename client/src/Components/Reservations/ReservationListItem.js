import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Header, Statistic, Label, Button } from 'semantic-ui-react'
import { FlexRow, FlexColumn } from 'custom-components'

const ReservationListItem = () => {
  return (
    <FlexRow alignCenter justifyBetween style={{width: "700px"}}>
    {/* I added some width to this because at 650px my buttons ruined the nice look.  */}
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

      {/* Buttons and Link added here and checkout option taken off of sidebar menu */}
      <FlexColumn className="space-left-20">
        <Button size='tiny' color='teal' style={{margin: "5px"}}>More Info</Button>
        {/* This { Link } will have an _id or booking id as it needs to go to a specific booking */}
        <Link to='/dashboard/checkout'>
          <Button size='tiny' color='orange' style={{margin: "5px"}}>Check out</Button>
        </Link>
      </FlexColumn>

    </FlexRow>
  )
}

export default ReservationListItem