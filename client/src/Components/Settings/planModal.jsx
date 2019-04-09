import React, { Component } from 'react'
import { Header, Segment, Button, Modal, Grid } from 'semantic-ui-react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './updatePlan';
import {config} from '../../config/dev';


// Redux store set billingPlan by string on user object

// Stretch: set the auto chosen button based on billing plan on state

export default class PlanModal extends Component {
    state = { 
        open: false,
        free: false,
        upgraded: true,
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
                upgraded: true,
            })
        } else {
            this.setState({
                free: true,
                upgraded: false,
            })
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
                <Grid centered divided columns={2}>

                    <Grid.Column textAlign='center'>
                        <Header as='h4'>Basic Plan</Header>
                        <p>
                        <b>1</b> free property
                        </p>
                        <Button value='free' onClick={this.handleChange} basic={this.state.free} color="blue">Choose</Button>
                    </Grid.Column>
                    
                    <Grid.Column textAlign='center'>
                        <Header as='h4'>Upgraded Plan</Header>
                        <p>
                        <b>2-9</b> properties, $8 per property
                        </p>
                        <p>
                        <b>10+</b> properties, $5 per property
                        </p>
                        <Button value='upgraded' onClick={this.handleChange} basic={this.state.upgraded} color="blue">Choose</Button>
                    </Grid.Column>

                </Grid>
            </Segment>
 
            <StripeProvider apiKey={config.stripeApiKey}>
                <Elements>
                <CheckoutForm close={this.close} />
                </Elements>
            </StripeProvider>

                        
                    </Modal.Content>

                    <Modal.Actions>

                    </Modal.Actions>
            </Modal>
            </div>
        )
    }
};
