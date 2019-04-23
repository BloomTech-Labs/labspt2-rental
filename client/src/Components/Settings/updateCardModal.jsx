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

// BUG: Does not update billing when component closes

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false, loading: false };
  }

  dimmerClose = () => this.setState({ active: false, open: false });

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    let { token } = await this.props.stripe.createToken({
      address_line1: this.props.address1,
      address_city: this.props.city,
      address_state: this.props.state,
      address_zip: this.props.zip
    });

    let response = await axios.post(`${config.apiUrl}/api/stripe/updateCC`, {
      token: token,
      customerID: this.props.user.stripeCustomerID
    });

    if (response) {
      this.setState({
        loading: false
      });
    }

    if (response.status === 200 || response.status === 201)
      this.setState({ complete: true });
  };

  render() {
    let success;
    if (this.state.complete) {
      success = (
        <Dimmer active onClickOutside={this.props.close} page>
          <Header as="h2" icon inverted>
            <Icon name="check circle outline" />
            Credit Card Updated!
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
            onClick={this.handleSubmit}
          />
        </Segment>
      </div>
    );
  }
}

export default injectStripe(UpdateCard);
