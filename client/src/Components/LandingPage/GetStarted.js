import React from "react";
import {
  Container,
  Step,
  Icon,
  Header
} from "semantic-ui-react";
import {FlexColumn} from '../../custom-components/index';

export const GetStarted = ({mobile}) => (
    <FlexColumn style={{width: '100%', height: mobile ? '75vh' : '28vh', backgroundColor: '#1a1b1c', display: 'flex', alignItems: 'center', paddingTop: '3em'}}>
        <Header inverted as='h2' content='Get started in three simple steps:'/>

        <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: mobile ? '2em' : '1em', paddingBottom: '2em'}}>

        <Step.Group >
            <Step  style={{backgroundColor: '#1a1b1c', border: '1px solid #f6f9fc'}}>
            <Icon name='user outline' style={{color: '#4ca34b'}} />
            <Step.Content>
                <Step.Title style={{color: '#f6f9fc', fontWeight: 'bold'}}>Sign Up</Step.Title>
                <Step.Description style={{color: '#f6f9fc'}}>Create Your Account</Step.Description>
            </Step.Content>
            </Step>

            <Step style={{backgroundColor: '#1a1b1c', border: '1px solid #f6f9fc'}} >
            <Icon name='home' style={{color: '#4ca34b'}}/>
            <Step.Content>
                <Step.Title style={{color: '#f6f9fc', fontWeight: 'bold'}}>Add Property</Step.Title>
                <Step.Description style={{color: '#f6f9fc'}}>Enter Property Details</Step.Description>
            </Step.Content>
            </Step>

            <Step style={{backgroundColor: '#1a1b1c', border: '1px solid #f6f9fc'}} >
            <Icon name='dollar' style={{color: '#4ca34b'}}/>
            <Step.Content>
                <Step.Title style={{color: '#f6f9fc', fontWeight: 'bold'}}>Book Guests</Step.Title>
                <Step.Description style={{color: '#f6f9fc'}}>Collect Money!</Step.Description>
            </Step.Content>
            </Step>
        </Step.Group>
    </Container>
  </FlexColumn>
);