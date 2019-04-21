import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FlexColumn } from "custom-components";
import { CardElement, injectStripe } from "react-stripe-elements";
import {
  Button,
  Segment,
  Dimmer,
  Header,
  Icon,
  Loader
} from "semantic-ui-react";

// update package.json proxy line with non local host

class CheckoutElement extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false, loading: false };
    this.submit = this.submit.bind(this);
  }

  dimmerClose = () => {
      this.setState({ active: false, open: false });
};

  async submit(ev) {
    this.setState({
      loading: true,
      zip: '77059'
    });

    let token = await this.props.stripe.createToken({
      email: this.props.guest.email,
      address_zip: this.state.zip,
      name: `${this.props.guest.firstName} ${this.props.guest.lastName}`
    });

    let response = await this.props.checkout(token, this.props.totalAmount, this.props.reservationID)

    if (response === 201) {
      this.setState({
        loading: false,
        complete: true
      });
    }
  }

  render() {
    let success;
    if (this.state.complete) {
      success = (
        <Dimmer active onClickOutside={this.props.close} page>
        <FlexColumn alignCenter >
          <Header as="h2" icon inverted>
            <Icon name="check circle outline" />
            Reservation Successfully Paid!
          </Header>
          <Link to={`/dashboard/reservations/view/${this.props.reservationID}`}>
          <Button style={{marginTop: '1em'}}>
              Close
          </Button>
          </Link>
          </FlexColumn>
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
          <p>Confirm and Pay</p>
          <Segment padded style={{ marginTop: "25px", marginBottom: "25px" }}>
            {success}
            {/* first name, last name, billing info (zip code) */}
            <CardElement />
            {loader}
          </Segment>

          <Button floated="right" negative basic onClick={this.props.close}>
            Cancel
          </Button>

            <Button floated='right' positive onClick={this.submit} >
                <Button.Content visible>
                    <Icon name='lock'/>
                    Confirm and Pay
                </Button.Content>
            </Button>

        </Segment>
      </div>
    );
  }
}

export default injectStripe(CheckoutElement);
