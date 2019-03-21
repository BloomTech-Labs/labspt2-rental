import React, {Component} from 'react';
import {CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import config from '../../config/index';

// update package.json proxy line with non local host

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    console.log("User clicked submit")
    let { token } = await this.props.stripe.createToken({name: "True Name"})
    console.log('token', token);
    let response = await axios.post(`${config.apiUrl}/api/stripe/charge`, token)
    console.log(response)

  if (response.status === 200) this.setState({complete: true})
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);