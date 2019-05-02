import React, { Component } from "react";
import {
  Header,
  Segment,
  Button,
  Modal,
  Form,
  Input
} from "semantic-ui-react";
import { FlexRow } from '../../custom-components/index';
import { Elements, StripeProvider } from "react-stripe-elements";
import UpdateCardModal from "./updateCardModal";
import { config } from "../../config/dev";

export default class UpdateBillingModal extends Component {
  state = {
    open: false,
    address1: "",
    city: "",
    state: ""
  };

  close = () =>
    this.setState({
      open: false,
      address1: this.props.user.billingAddress.address1,
      city: this.props.user.billingAddress.city,
      state: this.props.user.billingAddress.state
    });

  show = () => this.setState({ open: true });

  componentDidMount = () => {
    this.setState({
      address1: this.props.user.billingAddress.address1,
      city: this.props.user.billingAddress.city,
      state: this.props.user.billingAddress.state
    });
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.setState({
        address1: this.props.user.billingAddress.address1,
        city: this.props.user.billingAddress.city,
        state: this.props.user.billingAddress.state
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { open, address1, city, state } = this.state;

    return (
      <div>
        <Button basic color="blue" onClick={this.show}>
          Update Credit Card
        </Button>

        <Modal open={open} onClose={this.close}>
          <Modal.Header>Update Your Billing Details</Modal.Header>

          <Modal.Content>
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
                          onChange={this.handleChange}
                        />
                      </Form.Field>
  
                      <Form.Field style={{ width: '30%'}} >
                        <label>City</label>
                        <Input
                          name="city"
                          value={city || ""}
                          type="text"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
  
                      <Form.Field style={{ width: '30%'}} >
                        <label>State</label>
                        <Input
                          name="state"
                          value={state || ""}
                          type="text"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </FlexRow>
  
                  </Form>
              </Segment>

            <StripeProvider apiKey={config.stripeApiKey}>
              <Elements>
                <UpdateCardModal
                  user={this.props.user}
                  close={this.close}
                  address1={this.state.address1}
                  city={this.state.city}
                  state={this.state.state}
                  zip={this.state.zip}
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
