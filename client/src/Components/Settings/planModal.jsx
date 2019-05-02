import React, { Component } from "react";
import {
  Header,
  Segment,
  Button,
  Modal,
  Grid,
  Popup,
  Icon,
  Form,
  Input
} from "semantic-ui-react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { FlexRow } from "../../custom-components/index";
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
    upgraded: true,
    address1: '',
    city: '',
    state: ''
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

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { open, address1, city, state } = this.state;

    let billingAddress = {
      address1: address1,
      city: city,
      state: state
    }

    let plan;

    if(!this.props.user.billingAddress){
      plan = (
        <div>
        <Button basic color="blue" onClick={this.show}>
          Update Plan
        </Button>
  
        <Modal open={open} onClose={this.close}>
          <FlexRow style={{ marginTop: "2em", marginLeft: "3%" }}>
            <Header as="h1">Choose Your Monthly Billing Plan</Header>
  
            <Popup
              trigger={
                <Icon
                  name="info"
                  size="small"
                  style={{
                    alignSelf: "flex-start",
                    opacity: "0.8",
                    paddingLeft: "1%"
                  }}
                />
              }
              content={`Roostr's monthly plan auto-updates each time you add or remove a property, but only runs a charge at the end of your monthly billing period. You will be notified of any new billing amount. Properties cannot be deleted until they have no upcoming reservations.`}
              hideOnScroll
              position="right center"
              style={{ width: "30vw" }}
            />
          </FlexRow>
  
          <Modal.Content>
            <Segment>
              <Grid centered divided columns={2}>
                <Grid.Column textAlign="center">
                  <Header as="h4" style={{ fontSize: "1.25em" }}>
                    Basic Plan
                  </Header>
                  <p>
                    <b>1</b> rental property
                  </p>
                  <p>
                    <b>Free</b> every month
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
                  <Header as="h4" style={{ fontSize: "1.25em" }}>
                    Upgraded Plan
                  </Header>
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
  
            <Segment>
                <Header as="h3" style={{ marginBottom: "40px" }}>
                  Billing Address
                </Header>
  
                  <Form>
                    <FlexRow justifyBetween >
                      <Form.Field style={{ width: '30%'}} >
                        <label>Address</label>
                        <Input
                          name="address1"
                          value={address1 || ""}
                          type="text"
                          onChange={this.handleInput}
                        />
                      </Form.Field>
  
                      <Form.Field style={{ width: '30%'}} >
                        <label>City</label>
                        <Input
                          name="city"
                          value={city || ""}
                          type="text"
                          onChange={this.handleInput}
                        />
                      </Form.Field>
  
                      <Form.Field style={{ width: '30%'}} >
                        <label>State</label>
                        <Input
                          name="state"
                          value={state || ""}
                          type="text"
                          onChange={this.handleInput}
                        />
                      </Form.Field>
                    </FlexRow>
  
                  </Form>
              </Segment>
  
            <StripeProvider apiKey={config.stripeApiKey}>
              <Elements>
                <CheckoutForm
                  close={this.close}
                  getUser={this.props.getUser}
                  free={this.state.free}
                  user={this.props.user}
                  billingAddress={billingAddress}
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
    } else {

      let userBillingAddress = {
        address1: this.props.user.billingAddress.address1,
        city: this.props.user.billingAddress.city,
        state: this.props.user.billingAddress.state
      }
      plan = (<div>
        <Button basic color="blue" onClick={this.show}>
          Update Plan
        </Button>
  
        <Modal open={open} onClose={this.close}>
          <FlexRow style={{ marginTop: "2em", marginLeft: "3%" }}>
            <Header as="h1">Choose Your Monthly Billing Plan</Header>
  
            <Popup
              trigger={
                <Icon
                  name="info"
                  size="small"
                  style={{
                    alignSelf: "flex-start",
                    opacity: "0.8",
                    paddingLeft: "1%"
                  }}
                />
              }
              content={`Roostr's monthly plan auto-updates each time you add or remove a property, but only runs a charge at the end of your monthly billing period. You will be notified of any new billing amount. Properties cannot be deleted until they have no upcoming reservations.`}
              hideOnScroll
              position="right center"
              style={{ width: "30vw" }}
            />
          </FlexRow>
  
          <Modal.Content>
            <Segment>
              <Grid centered divided columns={2}>
                <Grid.Column textAlign="center">
                  <Header as="h4" style={{ fontSize: "1.25em" }}>
                    Basic Plan
                  </Header>
                  <p>
                    <b>1</b> rental property
                  </p>
                  <p>
                    <b>Free</b> every month
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
                  <Header as="h4" style={{ fontSize: "1.25em" }}>
                    Upgraded Plan
                  </Header>
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
                  getUser={this.props.getUser}
                  free={this.state.free}
                  user={this.props.user}
                  billingAddress={userBillingAddress}
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

    return (
      <div>
        {plan}
      </div>
    );
  }
};
