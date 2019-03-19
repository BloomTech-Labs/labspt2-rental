import React, { Component } from 'react';
import { Segment, Header, Container, Button } from 'semantic-ui-react';

export default class CreditCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            cardType: '',
            lastFour: '',
            expiration: '',
            address: '',
            city: '',
            state: '',
            zip: '',

        }
    }

    componentDidMount = () => {
        this.setState({
                cardType: this.props.cc.cardType,
                lastFour: this.props.cc.lastFour,
                expiration: this.props.cc.expiration,
                address: this.props.cc.address,
                city: this.props.cc.city,
                state: this.props.cc.state,
                zip: this.props.cc.zip,
    
        })
    }

    render () {
        const { cardType, lastFour, expiration, address, city, state, zip } = this.state;

        return (
            <Segment>
                <Header as='h2'>Credit Card {this.state.cardType}</Header>

                <Container>
                    <Header as='h4'>{cardType}</Header>
                    <p>**** **** **** {lastFour}</p>
                </Container>

                <Container>
                    <Header as='h4'>Expires</Header>
                    <p>{expiration}</p>
                </Container>

                <Container>
                    <Header as='h3'>Billing Address</Header>
                    <p>{address}</p>
                    <p>{city}, {state} {zip}</p>
                </Container>

                <Button basic color="blue">Update Credit Card</Button>
            </Segment>
        )
    }
}