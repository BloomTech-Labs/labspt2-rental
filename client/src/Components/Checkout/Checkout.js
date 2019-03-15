import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Statistic, Label, Button } from 'semantic-ui-react'
import { FlexRow, FlexColumn } from 'custom-components'
import CheckoutEnvioceItemCard from './CheckoutEnvioceItemCard'

const Checkout = () => {
  return (
    <FlexRow alignCenter justifyBetween style={{width: "650px"}}>
      <FlexColumn>

        <Header size='large' color='orange'>Booking ID: Some ID Number</Header>
        <Header size='medium'>Guest Name</Header>
        <p>email@email.com</p>
        <p>Phone Number</p>

        <Label color='blue' horizontal style={{marginTop: "20px"}}>House 1</Label>
        <Header>Address: Some Address, ST 12345</Header>

        <FlexRow style={{paddingTop: "10px"}}>
          <Statistic size='tiny'>
            <Statistic.Label>Check-in</Statistic.Label>
            <Statistic.Value>1/27</Statistic.Value>
          </Statistic>
          <Statistic size='tiny'>
            <Statistic.Label>Check-out</Statistic.Label>
            <Statistic.Value>1/30</Statistic.Value>
          </Statistic>
        </FlexRow> 

        <CheckoutEnvioceItemCard />

        <FlexRow style={{paddingTop: "10px"}}>
          <Header size='medium'>Employee:</Header>
          <Label color="grey" style={{marginLeft: '10px'}}>Name</Label>
        </FlexRow>

        <FlexRow style={{marginTop: "10px"}}>
          <Header size='medium'>Billing Status:</Header>
          <Label color='red' style={{marginLeft: '10px'}}>Unpaid</Label>
        </FlexRow>

        <FlexRow style={{marginTop: "10px"}}>
          <Link to='/dashboard/reservations'>
            <Button color='grey'>Exit</Button>
          </Link>
          <Button color='teal'>Send Invoice</Button>
          <Button color='orange'>Process Payment</Button>
        </FlexRow>
      
      </FlexColumn>
    </FlexRow>
  )
}

export default Checkout;