import React, { Component } from "react";
import {
  Button,
  Form,
  Divider,
  Segment,
  Header,
  Message,
  Dimmer,
  Icon
} from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import { Link } from "react-router-dom";

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordCheck: "",
      firstName: "",
      lastName: "",
      message: "",
      disabled: true,
      active: false
    };
  }

  handleInputChange = e => {
    const {
      password,
      passwordCheck,
      username,
      email,
      firstName,
      lastName
    } = this.state;

    if (e.target.name === "passwordCheck") {
      if (
        e.target.value === password &&
        passwordCheck !== "" &&
        username !== "" &&
        email !== "" &&
        firstName !== "" &&
        lastName !== ""
      ) {
        this.setState({
          disabled: false,
          message: ""
        });
      } else {
        this.setState({
          disabled: true,
          message: "mismatch"
        });
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  dimmerClose = () => {
    this.setState({ active: false });
    this.props.history.push(`/dashboard/`);
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: "owner"
    };

    event.preventDefault();

    this.props
      .registerUser(user)
      .then(success => {
        if (this.props.registration.token) {
          this.setState({
            active: true
          });
        } else {
          this.setState({
            message: `Could not create user account`
          });
        }
      })
      .catch(err => {
        this.setState({
          message: `${err}`
        });
      });
  };

  render() {
    const { message, disabled, active } = this.state;

    let messageAlert;
    if (message === "mismatch") {
      messageAlert = <Message size="tiny">Passwords must match!</Message>;
    } else if (message !== "") {
      messageAlert = <Message size="tiny">{message}</Message>;
    } else {
      messageAlert = <Divider section />;
    }

    let submitButton;
    if (disabled) {
      submitButton = (
        <Button basic color="green" type="submit" disabled>
          Update
        </Button>
      );
    } else {
      submitButton = (
        <Button color="green" type="submit" active>
          Submit
        </Button>
      );
    }

    let success;
    if (active) {
      success = (
        <Dimmer active onClickOutside={this.dimmerClose} page>
          <Header as="h2" icon inverted>
            <Icon name="check circle outline" />
            Account created!
          </Header>
        </Dimmer>
      );
    } else {
      success = null;
    }

    return (
      <FlexColumn
        width="full"
        alignCenter
        justifyCenter
        style={{ backgroundColor: "#1a1b1c", height: "100vh" }}
      >
        <Segment className="sm-container">
          <Header size="large" style={{ color: "#4ca34b" }}>
            Registration
          </Header>
          {success}
          <Divider />

          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label htmlFor="username-input">Username</label>
              <input
                id="username-input"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="first-name-input">First Name</label>
              <input
                id="firstName-input"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="last-name-input">Last Name</label>
              <input
                id="lastName-input"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </Form.Field>

            <Divider
              style={{
                margin: "auto",
                marginTop: "2em",
                marginBottom: "2em",
                width: "80%"
              }}
            />

            <Form.Field>
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="input-password-again">Verify Password</label>
              <input
                id="second-password-input"
                placeholder="Verify Password"
                name="passwordCheck"
                type="password"
                value={this.state.passwordCheck}
                onChange={this.handleInputChange}
              />
            </Form.Field>

            {messageAlert}

            <FlexRow width="full" alignEnd justifyBetween>
              <FlexColumn alignStart justifyBetween>
                <p style={{ color: "#1a1b1c", marginLeft: "5px" }}>
                  Already registered?
                </p>
                <Link to="/login">
                  <Button type="button">Login</Button>
                </Link>
              </FlexColumn>

              {submitButton}
            </FlexRow>
          </Form>
        </Segment>
      </FlexColumn>
    );
  }
}

export default RegistrationPage;
