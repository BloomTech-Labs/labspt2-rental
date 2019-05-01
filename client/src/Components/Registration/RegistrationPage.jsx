import React, { Component } from "react";
import {
  Button,
  Form,
  Divider,
  Segment,
  Header,
  Message,
  Dimmer,
  Popup,
  Icon
} from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import { Link } from "react-router-dom";

import { complexityCheck } from "./complexityCheck";

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
      popupErrorMessage: "",
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
    this.props.history.push(`/dashboard`);
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: "owner",
      billingPlan: "free"
    };

    event.preventDefault();

    this.props
      .registerUser(user)
      .then(success => {
        if (this.props.registration.token) {
          localStorage.setItem("authorization", this.props.registration.token);
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

  passwordComplexity = e => {
    const password = e.target.value;
    const checks = complexityCheck(password);
    const {
      length,
      validChar,
      capital,
      lowercase,
      number,
      specChar,
      validPW
    } = checks;
    let lengthErr,
      validCharErr,
      capitalErr,
      lowercaseErr,
      numberErr,
      specCharErr;
    // --Error message builder--
    if (!validPW) {
      // First define all relevant error messages
      if (!length) lengthErr = <div> - contain at least 8 chars</div>;
      if (!validChar)
        validCharErr = <div> - contain only valid characters</div>;
      if (!lowercase)
        lowercaseErr = <div> - contain at least one lowercase letter</div>;
      if (!capital)
        capitalErr = <div> - contain at least one capital letter</div>;
      if (!specChar)
        specCharErr = <div>{` - contain one of !,#,$,%,&,?,@,^,~`}</div>;
      if (!number) numberErr = <div> - contain at least one number</div>;
      // Use the relevant error messages to to build the message
      const popup = (
        <>
          <div>Please correct the following:</div>
          {lengthErr}
          {validCharErr}
          {capitalErr}
          {lowercaseErr}
          {numberErr}
          {specCharErr}
        </>
      );
      // send the message to render
      this.setState({
        message: "checker",
        popupErrorMessage: popup
      });
      // prevent someone from changing focus
      this.password.focus();
    } else {
      // resets the message on successful password
      this.setState({ message: "" });
    }
  };

  render() {
    const { message, disabled, active, popupErrorMessage } = this.state;

    let messageAlert;
    if (message === "mismatch") {
      messageAlert = <Message size="tiny">Passwords must match!</Message>;
    } else if (message === "checker") {
      messageAlert = (
        <Message size="tiny">
          Please enter a valid password
          <Popup trigger={<Icon name="info" />} content={popupErrorMessage} />
        </Message>
      );
    } else if (message !== "") {
      messageAlert = <Message size="tiny">{message}</Message>;
    } else {
      messageAlert = <Divider section />;
    }

    let submitButton;
    if (disabled) {
      submitButton = (
        <Button basic color="green" type="submit" disabled>
          Submit
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
          <FlexColumn alignCenter>
            <Header as="h2" icon inverted>
              <Icon
                name="check circle outline"
                style={{ marginBottom: "0.5em" }}
              />
              Account Created!
            </Header>
            <Button
              onClick={this.dimmerClose}
              inverted
              style={{ marginTop: "1em" }}
            >
              Login
            </Button>
          </FlexColumn>
        </Dimmer>
      );
    } else {
      success = null;
    }

    return (
      <FlexColumn
        width="full"
        alignCenter
        justifyBetween
        style={{
          backgroundColor: "#1a1b1c",
          paddingBottom: "10vh",
          paddingTop: "2%"
        }}
      >
        <Link
          to="/"
          style={{
            alignSelf: "flex-start",
            marginLeft: "2%",
            marginBottom: "2em"
          }}
        >
          <Button inverted>Back</Button>
        </Link>

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
                onBlur={this.passwordComplexity}
                ref={input => {
                  this.password = input;
                }}
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
