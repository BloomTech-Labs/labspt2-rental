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

  dimmerClose = () => {
    this.setState({ active: false, open: false })
  };

  async submit(ev) {
    this.setState({
      loading: true
    });

    let planType = "";

    if (this.props.free === true && this.props.upgraded === false) {
      planType = "upgraded";
    } else if (this.props.free === false && this.props.upgraded === true) {
      planType = "free";
    } else {
      window.alert("Error - plan type not chosen");
    }

    let { token } = await this.props.stripe.createToken({
      email: this.props.user.email,
      name: `${this.props.user.firstName} ${this.props.user.lastName}`
    });

    let response = await axios.post(`${config.apiUrl}/api/stripe/subscribe`, {
      token: token,
      updatedPlan: planType,
      address: {
        address_line1: this.props.billingAddress.address1,
        address_city: this.props.billingAddress.city,
        address_state: this.props.billingAddress.state,
      }
    });

    if (response) {
      this.props.getUser();
      this.setState({
        loading: false
      });
    }

    if (response.status === 201) this.setState({ complete: true });
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
            style={{ marginRight: "1%" }}
          />
        </Segment>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
