import React, { Component } from 'react'
import { Header, Segment, Button, Modal, Grid, Form, Input } from 'semantic-ui-react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import UpdateCardModal from './updateCardModal';
import {config} from '../../config/dev';


export default class UpdateBillingModal extends Component {
    state = { 
        open: false,
     }

    close = () => this.setState({ open: false })

    show = () => this.setState({ open: true })

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            disabled: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
    }


//     billingAddress:
// address1: "1234 Honey Bear Ct"
// city: "Tempe"
// state: "AZ"
// zip: "57683"


    render () {
        const { open } = this.state;
        const {address1, city, state, zip} = this.props.user.billingAddress;
        console.log('user props', this.props.user)

        return (
            <div>
                <Button basic color="blue" onClick={this.show}>Update Credit Card</Button>

                <Modal open={open} onClose={this.close}>
                <Modal.Header>Update Your Billing Details</Modal.Header>

                    <Modal.Content>

            <Segment>
                <Header as='h3'style={{ marginBottom: '40px'}} >Billing Address</Header>
                <Grid divided columns={2}>
                <Form>
                    <Grid.Column left >
                    <Grid row={2}>
                    <Grid.Row textAlign='left'>
                        <Form.Field inline>
                            <label>Address</label>
                            <Input inline
                                name='address'
                                value={address1 || ''}
                                type='text'
                                onChange={this.handleChange} />
                        </Form.Field>
                    </Grid.Row>
                    
                    <Grid.Row textAlign='left'>
                    <Form.Field inline>
                            <label>City</label>
                            <Input inline
                                name='city'
                                value={city || ''}
                                type='text'
                                onChange={this.handleChange} />
                        </Form.Field>
                    </Grid.Row>
                    </Grid>
                    </Grid.Column>

                    <Grid.Column>
                        <Grid row={2}>
                    <Grid.Row textAlign='left'>
                    <Form.Field inline>
                            <label>State</label>
                            <Input inline
                                name='state'
                                value={state || ''}
                                type='text'
                                onChange={this.handleChange} />
                        </Form.Field>
                    </Grid.Row>

                    <Grid.Row textAlign='left'>
                    <Form.Field inline>
                            <label>Zip Code</label>
                            <Input inline
                                name='zip'
                                value={zip || ''}
                                type='text'
                                onChange={this.handleChange} />
                        </Form.Field>
                    </Grid.Row>
                    </Grid>
                    </Grid.Column>
                </Form>
                </Grid>
            </Segment>
 
            <StripeProvider apiKey={config.stripeApiKey}>
                <Elements>
                <UpdateCardModal close={this.close} />
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
