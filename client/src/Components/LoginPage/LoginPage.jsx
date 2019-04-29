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
              Login Successful!
            </Header>
            <Button
              onClick={this.dimmerClose}
              inverted
              style={{ marginTop: "1em" }}
            >
              Continue
            </Button>
          </FlexColumn>
        </Dimmer>
      );
    } else {
      success = null;
    }

    return (
      <div style={{ backgroundColor: "#f6f9fc" }}>
        <FlexColumn
          width="full"
          alignCenter
          justifyBetween
          style={{
            backgroundColor: "#1a1b1c",
            paddingBottom: "50vh",
            paddingTop: "2%"
          }}
        >
          <Link
            to="/"
            style={{
              alignSelf: "flex-start",
              marginLeft: "2%",
              marginBottom: "8em"
            }}
          >
            <Button inverted>Back</Button>
          </Link>

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
              <Link to="/forgot">Forgot Password?</Link>
              {messageAlert}

              <FlexRow width="full" alignEnd justifyBetween>
                <FlexColumn alignStart justifyBetween>
                  <p style={{ color: "#1a1b1c", marginLeft: "5px" }}>
                    Not yet registered?
                  </p>
                  <Link to="/register">
                    <Button type="button">Register</Button>
                  </Link>
                </FlexColumn>

                {submitButton}
              </FlexRow>
            </Form>
          </Segment>
        </FlexColumn>
      </div>
    );
  }
}

export default LoginPage;
