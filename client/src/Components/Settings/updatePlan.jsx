import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import {
  Button,
  Segment,
  Dimmer,
  Header,
  Icon,
  Loader
} from "semantic-ui-react";
import axios from "axios";
import config from "../../config/index";

// update package.json proxy line with non local host

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false, loading: false };
    this.submit = this.submit.bind(this);
  }

  dimmerClose = () => this.setState({ active: false, open: false });

  async submit(ev) {
    this.setState({
      loading: true
    });

    // Fetch data from state to fill into the token. For now, it's dummy data.

    let { token } = await this.props.stripe.createToken({
      email: "owner@roostr.io",
      address_line1: "1234 Mountain Flower Ct",
      address_city: "Jonesville",
      address_state: "TX",
      address_zip: "77345",
      name: "Gwenog Jones"
    });
    let response = await axios.post(`${config.apiUrl}/api/stripe/subscribe`, {
      token: token,
      updatedPlan: "Midlevel"
    });

    if (response) {
      console.log("subscribe response", response.data);
      this.setState({
        loading: false
      });
    }

    if (response.status === 200) this.setState({ complete: true });
  }

  render() {
    let success;
    if (this.state.complete) {
      success = (
        <Dimmer active onClickOutside={this.props.close} page>
          <Header as="h2" icon inverted>
            <Icon name="check circle outline" />
            Billing Plan Updated!
          </Header>
        </Dimmer>
      );
    } else {
      success = null;
    }

    let loader;
    if (this.state.loading) {
      loader = (
        <Dimmer active inverted>
          <Loader inverted>Updating</Loader>
        </Dimmer>
      );
    } else {
      loader = null;
    }

    return (
      <div className="checkout">
        <Segment clearing padded>
          <p>Would you like to complete your upgrade?</p>
          <Segment padded style={{ marginTop: "25px", marginBottom: "25px" }}>
            {success}
            <CardElement />
            {loader}
          </Segment>

          <Button floated="right" negative basic onClick={this.props.close}>
            Cancel
          </Button>
          <Button
            floated="right"
            positive
            content="Update"
            onClick={this.submit}
          />
        </Segment>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
