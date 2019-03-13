import React from 'react'
import { Header, Statistic, Label, Icon, Button } from 'semantic-ui-react'
import { FlexRow, FlexColumn } from 'custom-components'

const Checkout = () => {
  return (
    <FlexRow alignCenter justifyBetween style={{width: "650px"}}>
      <FlexColumn>
        <Header size='large' color='orange'>Booking ID: Some ID Number</Header>
        <Header size='medium'>Guest Name</Header>
        <p>email@email.com</p>
        <p>Phone Number</p>
        <Label color='red' horizontal>House 1</Label>

        <FlexRow style={{paddingTop: "20px"}}>
          <Statistic size='tiny'>
            <Statistic.Label>Check-in</Statistic.Label>
            <Statistic.Value>1/27</Statistic.Value>
          </Statistic>
          <Statistic size='tiny'>
            <Statistic.Label>Check-out</Statistic.Label>
            <Statistic.Value>1/30</Statistic.Value>
          </Statistic>
        </FlexRow> 

        <FlexRow alignCenter justifyBetween style={{width: "650px"}}>

          <FlexRow alignCenter justifyBetween style={{paddingTop: "20px"}}>
            <FlexColumn>
              <Icon name='moon' size='massive'/>
            </FlexColumn>
            <FlexColumn alignCenter justifyBetween>
              <Statistic size='tiny'>
                <Statistic.Label>Nights</Statistic.Label>
                <Statistic.Value>3</Statistic.Value>
              </Statistic>
              <Button size='tiny' style={{marginBottom: "2px", width: "55px"}}><Icon name='caret up' size='big'/></Button>
              <Button size='tiny' style={{marginTop: "2px", width: "55px"}}><Icon name='caret down' size='big'/></Button>
            </FlexColumn>
          </FlexRow>
          
          <FlexRow style={{paddingTop: "20px"}}>
            <FlexColumn>
              <Icon name='users' size='massive'/>
            </FlexColumn>
            <FlexColumn alignCenter justifyBetween>
              <Statistic size='tiny'>
                <Statistic.Label>Guests</Statistic.Label>
                <Statistic.Value>3</Statistic.Value>
              </Statistic>
              <Button size='tiny' style={{marginBottom: "2px", width: "55px"}}><Icon name='caret up' size='big'/></Button>
              <Button size='tiny' style={{marginTop: "2px", width: "55px"}}><Icon name='caret down' size='big'/></Button>
            </FlexColumn>
          </FlexRow>
          
          <FlexRow style={{paddingTop: "20px"}}>
            <FlexColumn>
              <Icon name='leaf' size='massive'/>
            </FlexColumn>
            <FlexColumn alignCenter justifyBetween>
              <Statistic size='tiny'>
                <Statistic.Label>Cleaning Fee</Statistic.Label>
                <Statistic.Value>$65</Statistic.Value>
              </Statistic>
              <Button size='tiny' style={{marginBottom: "2px", width: "55px"}}><Icon name='caret up' size='big'/></Button>
              <Button size='tiny' style={{marginTop: "2px", width: "55px"}}><Icon name='caret down' size='big'/></Button>
            </FlexColumn>
          </FlexRow>

        </FlexRow>

        <FlexRow style={{paddingTop: "20px"}}>
          <h2>Employee:</h2>
          <p>Name</p>
        </FlexRow>

        <FlexRow>
          <h2>Billing Status:</h2>
          <Label color='red'>Unpaid</Label>
        </FlexRow>

        <FlexRow>
          <Button color='grey'>Exit</Button>
          <Button color='teal'>Send Invoice</Button>
          <Button color='orange'>Process Payment</Button>
        </FlexRow>
      
      </FlexColumn>
    </FlexRow>
  )
}

export default Checkout;