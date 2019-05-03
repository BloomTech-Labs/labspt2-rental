import React, { Component } from "react";
import {
  Header,
  Segment,
  Button,
  Modal,
  Grid,
  Divider
} from "semantic-ui-react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutElement from "./checkoutElement";
import { config } from "../../config/dev";

export default class CheckoutModal extends Component {
  state = {
    open: false
  };

  close = () => this.setState({ open: false });

  show = () => this.setState({ open: true });

  render() {
    const { open } = this.state;
    const stripeTotalAmount = this.props.total * 100;

    return (
      <div>
        <Button basic color="blue" onClick={this.show}>
          Checkout!
        </Button>

        <Modal open={open} onClose={this.close}>
          <Modal.Header>Checkout</Modal.Header>

          <Modal.Content>
            <Segment>
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column textAlign="left">
                    <p>
                      <b>Nightly Price:</b> {this.props.price}
                    </p>
                    <p>
                      <b>Nights:</b> {this.props.nights}
                    </p>
                    <p>
                      <b>Cleaning Fee:</b> {this.props.cleaningFee}
                    </p>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <p style={{ fontSize: "2em" }}>
                      <b>Total:</b> ${this.props.total}
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <StripeProvider apiKey={config.stripeApiKey}>
              <Elements>
                <CheckoutElement
                  close={this.close}
                  guest={this.props.guest}
                  checkout={this.props.checkout}
                  totalAmount={stripeTotalAmount}
                  reservationID={this.props.reservationID}
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
