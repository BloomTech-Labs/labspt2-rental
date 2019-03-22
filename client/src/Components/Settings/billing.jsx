import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import CreditCard from './creditCard';
import PlanModal from './planModal';
import { FlexRow } from '../../custom-components';

export default class Billing extends Component {
    constructor(){
        super();
        this.state = {
            nextBilling: '',
            billingPlan: 3,
        }
    }

    componentDidMount = () => {
        // Should pull this info from database
        this.setState({
            nextBilling: 'April 21, 2019'
        })
    }

    render(){
        const { nextBilling, billingPlan } = this.state;
        let description = billingPlans[billingPlan].description;
        let plan = <strong>{billingPlans[billingPlan].plan}</strong>;

        const cc = {
            cardType: 'Visa',
            lastFour: '8753',
            expiration: '10/2022',
            address: '1234 Mountain Flower Ct',
            city: 'Augustus',
            state: 'GA',
            zip: '54309',
        }

        return(
            <div>
            <Header as='h1'>Billing Details</Header>
            <CreditCard cc={cc}/>

            <FlexRow style={{ marginTop: "25px", marginBottom: "35px"}}>
                <p>Your next bill will be sent on {nextBilling}.</p>
            </FlexRow>

            <Segment>
                <Header as='h2'>Current Plan:</Header>
                <Segment.Inline> {plan}: {description}</Segment.Inline>
                <FlexRow style={{ marginTop: "25px"}}>
                    <PlanModal />
                </FlexRow>
            </Segment>
            </div>
        )
    }
}

const billingPlans = {
    1: {
        plan: 'Free',
        perRental: 0,
        perTransaction: 0,
        description: 'One property free'
    },
    2: {
        plan: 'Middle Tier',
        perRental: 0,
        perTransaction: 3,
        description: '3% transaction fee per booking'
    },
    3: {
        plan: 'Enterprise',
        perRental: 5,
        perTransaction: 0,
        description: '$5 per rental property'
    }
}