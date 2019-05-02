import React, { Component } from "react";
import { Button, Modal, Input, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexRow, FlexColumn } from "custom-components";
import axios from "axios";
import config from "config";

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      modalOpen: false,
      modalMessage: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  modalClose = () => {
    this.setState({ modalOpen: false });
    this.props.history.push("/");
  };

  sendEmail = async () => {
    const reset = { email: this.state.email };
    axios.post(`${config.apiUrl}/api/reset/forgot`, reset).then(response => {
      if (response.status === 202) {
        this.setState({
          modalOpen: true,
          modalMessage:
            "Your reset email has been sent. If you do not receive the email, please check your spam folder. The reset link expires in one hour."
        });
      } else {
        this.setState({
          modalOpen: true,
          modalMessage:
            "Your request did not go through. Please make sure you are using the email address associated with your account and try again. If the problem persists, please contact us at help@roostr.io."
        });
      }
    });
  };

  render() {
    return (
      <FlexColumn
        width="full"
        alignCenter
        justifyBetween
        style={{
          backgroundColor: "#1a1b1c",
          paddingBottom: "40vh",
          paddingTop: "40vh"
        }}
      >
        <Modal open={this.state.modalOpen} size="small">
          <Modal.Content>
            <p>{this.state.modalMessage}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.modalClose}>Return to Homepage</Button>
          </Modal.Actions>
        </Modal>
        <Header as="h2" inverted alignCenter>
          Forgot your password?
          <Header.Subheader
            inverted
            style={{ paddingTop: "2%", paddingBottom: "2%" }}
          >
            Enter your account email below and we will send you a link to reset.
          </Header.Subheader>
        </Header>
        <Input
          placeholder="Email Address"
          name="email"
          type="text"
          onChange={this.handleChange}
        />
        <FlexRow
          alignCenter
          style={{
            backgroundColor: "#1a1b1c",
            paddingBottom: "10vh",
            paddingTop: "2%"
          }}
        >
          <Button
            color="blue"
            alignCenter
            style={{
              margin: "10px"
            }}
            onClick={this.sendEmail}
          >
            Send Reset Email
          </Button>
          <Link to="/">
            <Button
              alignCenter
              style={{
                margin: "2%"
              }}
            >
              Cancel
            </Button>
          </Link>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default ForgotPass;

/* <p>
This component needs to have an input for an email address. It needs to
hit the `api/users/forgot` endpoint on the back end. That endpoint will
send a reset email. The email from the input needs to be sent in the
body of the request. This page needs to have a modal popup (or dimmer)
that alerts the user to the fact that they will receive an email with a
link that expires in one hour. Upon closing the modal or dimmer, this
component should reroute the user to the landing page.
</p> */
