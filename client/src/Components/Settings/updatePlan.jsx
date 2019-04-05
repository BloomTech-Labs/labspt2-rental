import React, {Component} from 'react';
import {CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Segment, Grid, Container } from 'semantic-ui-react';
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
    let { token } = await this.props.stripe.createToken({name: "True Name"})
    console.log('token', token);
    let response = await axios.post(`${config.apiUrl}/api/stripe/subscribe`, token)
    console.log('response', response)

  if (response.status === 200) this.setState({complete: true})
  }

  render() {
    if (this.state.complete) return <h1>Billing Plan Updated!</h1>;

    return (
      <div className="checkout">
      <Segment clearing padded>

        <p>Would you like to complete your upgrade?</p>
        <Segment padded style={{ marginTop: "25px", marginBottom: '25px'}} >
        <CardElement />
        </Segment>
       

          <Button floated="right" negative basic onClick={this.props.close} >Cancel</Button>
          <Button floated="right" positive content='Update'onClick={this.submit} />
      </Segment>


      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
