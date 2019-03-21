import React, { Component } from 'react'
import { Header, Segment, Button, Modal } from 'semantic-ui-react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { FlexColumn, FlexRow } from '../../custom-components';
import CheckoutForm from './updatePlan';



export default class PlanModal extends Component {
    state = { 
        open: false,
        free: true,
        midlevel: false,
        enterprise: false
     }

    close = () => this.setState({ open: false })

    show = () => this.setState({ open: true })

    handleSubmit = (e) => {
        e.preventDefault();
        // send axios call
    }

    handleChange = (e, {value}) => {
        console.log('value', value, 'state', this.state)
        if(value === 'free'){
            this.setState({
                free: true,
                midlevel: false,
                enterprise: false
            })
        } else if (value === 'midlevel'){
            this.setState({
                free: false,
                midlevel: false,
                enterprise: true
            })
        } else {
            this.setState({
                free: false,
                midlevel: false,
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
                <Modal.Header>Choose Your Billing Plan</Modal.Header>

                    <Modal.Content>

                <Segment>
                <FlexRow>

                <FlexColumn>
                    <Button value='free' onClick={this.handleChange} checked={this.state.free}>
                        <Segment>
                            <Header as='h4'>Free Plan</Header>
                            <p>Manage a single property for free.</p>
                        </Segment>
                    </Button>
                </FlexColumn>

                <FlexColumn>
                    <Button value='midlevel' onClick={this.handleChange} checked={this.state.midlevel}>
                        <Segment>
                            <Header as='h4'>Unicorn Plan</Header>
                            <p>$8 per property, per month.</p>
                            <p>Up to 10 properties.</p>
                        </Segment>
                    </Button>
                </FlexColumn>

                <FlexColumn>
                    <Button value='enterprise' onClick={this.handleChange} checked={this.state.enterprise}>
                        <Segment>
                            <Header as='h4'>Enterprise Plan</Header>
                            <p>$5 per month, per property.</p>
                            <p>Unlimited properties.</p>
                        </Segment>
                    </Button>
                </FlexColumn>

            </FlexRow>
            </Segment>
 
            <StripeProvider apiKey="pk_test_Il1MCOR4thnvsuNgiwCaJzOw">
                <Elements>
                <CheckoutForm />
                </Elements>
            </StripeProvider>

                        
                    </Modal.Content>

                    <Modal.Actions>

                        <Button negative onClick={this.close} >Cancel</Button>
                        <Button onClick={this.handleSubmit} positive content='Update' />
                    </Modal.Actions>
            </Modal>
            </div>
        )
    }
};
