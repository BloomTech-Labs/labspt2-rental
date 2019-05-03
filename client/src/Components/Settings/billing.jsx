import React, { Component } from "react";
import { Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import CreditCard from "./creditCard";
import PlanModal from "./planModal";
import { FlexRow } from "../../custom-components";

export default class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextBilling: "",
      billingPlan: "",
      stripeCustomerID: "",
      subscriptionID: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      nextBilling: "May 30, 2019",
      billingPlan: this.props.user.billingPlan,
      stripeCustomerID: this.props.user.stripeCustomerID,
      subscriptionID: this.props.user.subscriptionID
    });
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.setState({
        stripeCustomerID: this.props.user.stripeCustomerID,
        billingPlan: this.props.user.billingPlan,
        subscriptionID: this.props.user.subscriptionID
      });
    }
  };

  render() {
    const { nextBilling, billingPlan } = this.state;

    let loading;
    if (this.state.billingPlan === "") {
      loading = (
        <Segment>
          <Header as="h2">Current Plan:</Header>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      );
    } else if (!this.state.billingPlan) {
      loading = (
        <React.Fragment>
          <Header as="h1">Billing Details</Header>
          <Segment>
            <Header as="h2">Current Plan:</Header>
            <Segment.Inline>
              {" "}
              <strong>{billingPlans['free'].name}</strong>:{" "}
              {billingPlans['free'].description}
            </Segment.Inline>
            <FlexRow style={{ marginTop: "25px" }}>
              <PlanModal
                customerID={this.state.stripeCustomerID}
                user={this.props.user}
                getUser={this.props.getUser}
                properties={this.props.properties}
              />
            </FlexRow>
          </Segment>
        </React.Fragment>
      );
    } else if (!this.state.stripeCustomerID) {
      loading = (
        <React.Fragment>
          <Header as="h1">Billing Details</Header>
          <Segment>
            <Header as="h2">Current Plan:</Header>
            <Segment.Inline>
              {" "}
              <strong>{billingPlans[billingPlan].name}</strong>:{" "}
              {billingPlans[billingPlan].description}
            </Segment.Inline>
            <FlexRow style={{ marginTop: "25px" }}>
              <PlanModal
                getUser={this.props.getUser}
                customerID={this.state.stripeCustomerID}
                user={this.props.user}
                properties={this.props.properties}
              />
            </FlexRow>
          </Segment>
        </React.Fragment>
      );
    } else {
      loading = (
        <React.Fragment>
          <Header as="h1">Billing Details</Header>
          <CreditCard user={this.props.user} />

          <FlexRow style={{ marginTop: "25px", marginBottom: "35px" }}>
            <p>Your next bill will be sent on {nextBilling}.</p>
          </FlexRow>

          <Segment>
            <Header as="h2">Current Plan:</Header>
            <Segment.Inline>
              {" "}
              <strong>{billingPlans[billingPlan].name}</strong>:{" "}
              {billingPlans[billingPlan].description}
            </Segment.Inline>
            <FlexRow style={{ marginTop: "25px" }}>
              <PlanModal
                customerID={this.state.stripeCustomerID}
                getUser={this.props.getUser}
                user={this.props.user}
                properties={this.props.properties}
              />
            </FlexRow>
          </Segment>
        </React.Fragment>
      );
    }

    return <div>{loading}</div>;
  }
}

const billingPlans = {
  free: {
    _id: "5ca5930aae431b84bad59a4f",
    name: "Free",
    perPropertyPrice: 0,
    description: "One property"
  },
  upgraded: {
    _id: "5ca5930aae431b84bad59a50",
    name: "Upgraded",
    perPropertyPrice: 8,
    description: "$8 per rental property"
  }
};
