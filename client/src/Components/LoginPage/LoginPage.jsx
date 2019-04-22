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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      disabled: true,
      active: false
    };
  }

  handleInputChange = e => {
    const { password, email } = this.state;

    if (e.target.name === "password") {
      if (password !== "" && email !== "") {
        this.setState({
          disabled: false,
          message: ""
        });
      } else {
        this.setState({
          disabled: true,
          message: "Email and password required!"
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

  handleSubmit = e => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props
      .loginUser(credentials)
      .then(success => {
        if (this.props.auth.token) {
          this.setState({
            active: true
          });
        } else {
          this.setState({
            message: `Incorrect email and password combination.`
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
    if (message !== "") {
      messageAlert = <Message size="tiny">{message}</Message>;
    } else {
      messageAlert = <Divider section />;
    }

    let submitButton;
    if (disabled) {
      submitButton = <Button basic color='green' type='submit' disabled>Update</Button>;
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
            Login Successful!
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
            Login
          </Header>
          {success}
          <Divider />

          <Form onSubmit={this.handleSubmit}>
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

            {messageAlert}

            <FlexRow width="full" alignEnd justifyBetween>
              <FlexColumn alignStart justifyBetween>
                <p style={{ color: "#1a1b1c", marginLeft: "5px" }}>
                  Not yet registered?
                </p>
                <Link to="/register">
                  <Button type='button'>Register</Button >
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

export default LoginPage;
