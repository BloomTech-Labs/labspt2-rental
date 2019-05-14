import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Header,
  Dimmer,
  Loader,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexRow, FlexColumn } from "custom-components";
import axios from "axios";
import config from "config";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      newPassword: null,
      passwordCheck: null,
      loading: true,
      open: false,
      dimmerOpen: false,
      modalMessage: "",
      message: ""
    };
  }
  componentDidMount() {
    axios
      .post(`${config.apiUrl}/api/reset/verify`, {
        resetPasswordToken: this.props.match.params.token
      })
      .then(response => {
        localStorage.setItem("authorization", "Bearer " + response.data.token);

        this.setState({
          loading: false,
          id: response.data.id
        });
      })
      .catch(err => {
        this.setState({
          open: true,
          modalMessage:
            "Your link has expired. Please request a new reset email."
        });
      });
  }
  updatePassword = () => {
    const update = { _id: this.state.id, newPassword: this.state.newPassword };
    if (this.state.newPassword === this.state.passwordCheck) {
      axios
        .put(`${config.apiUrl}/api/reset/updateByEmail`, update)
        .then(response => {
          if (response.status === 200) {
            this.setState({ dimmerOpen: true });
          }
        })
        .catch(err => {
          this.setState({
            open: true,
            modalMessage: "Password could not be updated. Please try again."
          });
        });
    } else {
      this.setState({
        message: "Passwords must match"
      });
    }
  };
  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/");
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    let messageAlert;
    if (this.state.message !== "") {
      messageAlert = (
        <Message size="tiny" color="black">
          {this.state.message}
        </Message>
      );
    } else {
      messageAlert = null;
    }
    return (
      <FlexColumn
        width="full"
        alignCenter
        justifyBetween
        style={{
          backgroundColor: "#1a1b1c",
          paddingBottom: "30vh",
          paddingTop: "30vh"
        }}
      >
        <Dimmer active={this.state.loading} page>
          <Loader size="large">Verifying</Loader>
        </Dimmer>
        <Dimmer
          size="fullscreen"
          active={this.state.dimmerOpen}
          page
          onClickOutside={this.successClose}
        >
          <Header as="h1" inverted>
            Password Updated! Please log in with your new password.
            <Header.Subheader style={{ marginTop: "1%" }}>
              Click to return to Homepage.
            </Header.Subheader>
          </Header>
        </Dimmer>
        <Modal open={this.state.open} size="large">
          <Modal.Content>
            <p>{this.state.modalMessage}</p>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/forgot">
              <Button color="blue">Request new link</Button>
            </Link>
          </Modal.Actions>
        </Modal>
        <Header as="h2" inverted alignCenter style={{ padding: "1%" }}>
          Please choose a new password:
        </Header>
        <Input
          placeholder="New Password"
          name="newPassword"
          type="password"
          onChange={this.handleChange}
          style={{ margin: "1%" }}
        />
        <Input
          placeholder="Reenter Password"
          name="passwordCheck"
          type="password"
          onChange={this.handleChange}
          style={{ margin: "1%" }}
        />
        {messageAlert}
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
              margin: "1%"
            }}
            onClick={this.updatePassword}
          >
            Update
          </Button>
          <Link to="/">
            <Button
              alignCenter
              style={{
                margin: "1%"
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

export default ResetPass;

/* <p>
This component should render at `/forgot/:token`, with the token being
generated in the ForgotPass component and emailed to the user. This
component needs to have a CDM that hits the `/api/users/reset`
endpoint to verify that the token has not expired. The token from the
url needs to be sent in body of the request.{" "}
</p>
<p>
While the verification is being completed, this page needs to be in
loading status with a spinner. If verification is successful,
this.setState should change loading to false. If verification is not
successful, have a modal pop up that redirects them to the ForgotPass
component to resend the email.
</p>
<p>
Upon successful verification, the page will render with a form to
reset the password. A submit button should have a method that hits the
`/api/users/updateByEmail` endpoint. This requires the user id as _id
and the new password as newPassword in the request body. If update is
complete, a 200 is returned and a modal should pop up directing the
user back to the landing page to login with their new credentials. If
it is not successful, an error modal should pop up.
</p> */
