import React, { Component } from "react";
import { Segment, Header, Container } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "../../custom-components";
import UpdateBillingModal from "./updateBillingModal";

export default class CreditCard extends Component {
  render() {
    const { cardType, last4, cardExpiration } = this.props.user;
    const { address1, city, state, zip } = this.props.user.billingAddress;

    return (
      <Segment>
        <Header as="h2">Credit Card</Header>

        <FlexRow width="800px" alignCenter>
          <FlexColumn width="400px">
            <Container>
              <Header as="h4">{cardType}</Header>
              <p>**** **** **** {last4}</p>
            </Container>

            <Container>
              <Header as="h4">Expires</Header>
              <p>{cardExpiration}</p>
            </Container>
          </FlexColumn>

          <FlexColumn width="400px">
            <Container>
              <Header as="h3">Billing Address</Header>
              <p>{address1}</p>
              <p>
                {city}, {state} {zip}
              </p>
            </Container>
          </FlexColumn>
        </FlexRow>

        <FlexRow style={{ marginTop: "25px" }}>
          <UpdateBillingModal user={this.props.user} />
        </FlexRow>
      </Segment>
    );
  }
}
