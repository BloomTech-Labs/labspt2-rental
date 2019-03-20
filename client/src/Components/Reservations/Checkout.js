import React from "react";
import { Header, Statistic, Label, Button } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import CheckoutDetailCard from "./CheckoutDetailCard";

const Checkout = () => {
  return (
    <FlexRow alignCenter justifyBetween>
      <FlexColumn>
        <Header size="large" color="orange">
          Booking ID: Some ID Number
        </Header>
        <Header size="medium">Guest Name</Header>
        <p>email@email.com</p>
        <p>Phone Number</p>
        <Label color="violet" horizontal>
          House 1
        </Label>

        <FlexRow style={{ paddingTop: "20px" }}>
          <Statistic size="tiny">
            <Statistic.Label>Check-in</Statistic.Label>
            <Statistic.Value>1/27</Statistic.Value>
          </Statistic>
          <Statistic size="tiny">
            <Statistic.Label>Check-out</Statistic.Label>
            <Statistic.Value>1/30</Statistic.Value>
          </Statistic>
        </FlexRow>

        <CheckoutDetailCard />

        <FlexRow style={{ paddingTop: "20px" }}>
          <h2>Employee:</h2>
          <Label color="grey">Name</Label>
        </FlexRow>

        <FlexRow>
          <h2>Billing Status:</h2>
          <Label color="red">Unpaid</Label>
        </FlexRow>

        <FlexRow>
          <Button color="grey">Exit</Button>
          <Button color="teal">Send Invoice</Button>
          <Button color="orange">Process Payment</Button>
        </FlexRow>
      </FlexColumn>
    </FlexRow>
  );
};

export default Checkout;
