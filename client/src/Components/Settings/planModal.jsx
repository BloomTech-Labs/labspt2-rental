import React, { Component } from 'react'
import { Header, Segment, Button, Modal, Grid } from 'semantic-ui-react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { FlexColumn, FlexRow } from '../../custom-components';
import CheckoutForm from './updatePlan';


// Redux store set billingPlan by string on user object

// Stretch: set the auto chosen button based on billing plan on state

export default class PlanModal extends Component {
    state = { 
        open: false,
        free: false,
        midlevel: true,
        enterprise: true
     }

    close = () => this.setState({ open: false })

    show = () => this.setState({ open: true })

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.customerID){
            // update subscription
        } else {
            // create subscription if paid upgrade
        }
    }

    handleChange = (e, {value}) => {
        if(value === 'free'){
            this.setState({
                free: false,
                midlevel: true,
                enterprise: true
            })
        } else if (value === 'midlevel'){
            this.setState({
                free: true,
                midlevel: false,
                enterprise: true
            })
        } else {
            this.setState({
                free: true,
                midlevel: true,
                enterprise: false
            });
        }
    }

    render () {
        const { open } = this.state;

        return (
            <div>
                <Button basic color="blue" onClick={this.show}>Update Plan</Button>

                <Modal open={open} onClose={this.close}>
                <Modal.Header>Choose Your Monthly Billing Plan</Modal.Header>

                    <Modal.Content>

            <Segment>
                <Grid centered divided columns={3}>

                    <Grid.Column textAlign='center'>
                        <Header as='h4'>Basic Plan</Header>
                        <p>
                        <b>1</b> free property
                        </p>
                        <Button value='free' onClick={this.handleChange} basic={this.state.free} color="blue">Choose</Button>
                    </Grid.Column>
                    
                    <Grid.Column textAlign='center'>
                        <Header as='h4'>Business Plan</Header>
                        <p>
                        <b>2-9</b> properties, $8 per property
                        </p>
                        <Button value='midlevel' onClick={this.handleChange} basic={this.state.midlevel} color="blue">Choose</Button>
                    </Grid.Column>

                    <Grid.Column textAlign='center'>
                        <Header as='h4'>Premium Plan</Header>
                        <p>
                        <b>Unlimited</b> properties, $5 per property
                        </p>
                        <Button value='enterprise' onClick={this.handleChange} basic={this.state.enterprise} color="blue">Choose</Button>
                    </Grid.Column>
                </Grid>
            </Segment>
 
            <StripeProvider apiKey="pk_test_Il1MCOR4thnvsuNgiwCaJzOw">
                <Elements>
                <CheckoutForm close={this.close} />
                </Elements>
            </StripeProvider>

                        
                    </Modal.Content>

                    <Modal.Actions>

                        {/* <Button negative basic onClick={this.close} >Cancel</Button>
                        <Button onClick={this.handleSubmit} positive content='Update' /> */}
                    </Modal.Actions>
            </Modal>
            </div>
        )
    }
};
