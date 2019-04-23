import React, { Component } from "react";
import { Header, Segment, Button, Modal, Grid } from "semantic-ui-react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./updatePlan";
import { config } from "../../config/dev";

// IF no customer ID exists, create customer first time subscribe
// IF customer ID, check # of properties. Modal to prevent going to free until properties down to 1 -- or does this need to be active properties?

// Test updating usage functionality

// To give this and the CheckoutForm user info, pass it props via user={this.props.user} or user={this.state.user}. With that syntax, it it setup to pass that down to the CheckoutForm

export default class PlanModal extends Component {
  state = {
    open: false,
    free: false,
    upgraded: true
  };

  close = () => this.setState({ open: false });

  show = () => this.setState({ open: true });

  componentDidMount = () => {
    if (this.props.user.billingPlan === "upgraded") {
      this.setState({
        free: true,
        upgraded: false
      });
    }
  };

  handleChange = (e, { value }) => {
    if (value === "free") {
      this.setState({
        free: false,
        upgraded: true
      });
    } else {
      this.setState({
        free: true,
        upgraded: false
      });
    }
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button basic color="blue" onClick={this.show}>
          Update Plan
        </Button>

        <Modal open={open} onClose={this.close}>
          <Modal.Header>Choose Your Monthly Billing Plan</Modal.Header>

          <Modal.Content>
            <Segment>
              <Grid centered divided columns={2}>
                <Grid.Column textAlign="center">
                  <Header as="h4">Basic Plan</Header>
                  <p>
                    <b>1</b> free property
                  </p>
                  <Button
                    value="free"
                    onClick={this.handleChange}
                    basic={this.state.free}
                    color="blue"
                  >
                    Choose
                  </Button>
                </Grid.Column>

                <Grid.Column textAlign="center">
                  <Header as="h4">Upgraded Plan</Header>
                  <p>
                    <b>2-9</b> properties, $8 per property
                  </p>
                  <p>
                    <b>10+</b> properties, $5 per property
                  </p>
                  <Button
                    value="upgraded"
                    onClick={this.handleChange}
                    basic={this.state.upgraded}
                    color="blue"
                  >
                    Choose
                  </Button>
                </Grid.Column>
              </Grid>
            </Segment>

            <StripeProvider apiKey={config.stripeApiKey}>
              <Elements>
                <CheckoutForm
                  close={this.close}
                  free={this.state.free}
                  user={this.props.user}
                  upgraded={this.state.upgraded}
                  properties={this.props.properties}
                />
              </Elements>
            </StripeProvider>
          </Modal.Content>

          <Modal.Actions />
        </Modal>
      </div>
    );
  }
}
