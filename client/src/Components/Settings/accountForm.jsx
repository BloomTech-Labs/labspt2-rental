import React, { Component } from "react";
import { Form, Input, Button, Dimmer, Header, Icon } from "semantic-ui-react";
import PasswordModal from "./passwordModal";

export default class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      disabled: true,
      active: false
    };
  }

  componentDidMount = () => {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      phone: this.props.user.phone
    });
  };

  componentDidUpdate = prevProps => {
    // Bug: reverts briefly to the old state because it differs from the updated state. Delay checking?
    if (this.props !== prevProps) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        phone: this.props.user.phone
      });
    }
  };

  handleClose = () => this.setState({ active: false });

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = this.state;
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
    };
    this.props
      .update(updatedUser)
      .then(success => {
        this.setState({
          active: true
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { firstName, lastName, email, phone, disabled, active } = this.state;
    let button;
    if (disabled) {
      button = <Button disabled>Save</Button>;
    } else {
      button = (
        <Button basic color="blue" active onClick={this.handleSubmit}>
          Save
        </Button>
      );
    }

    let success;
    if (active) {
      success = (
        <Dimmer active onClickOutside={this.handleClose} page>
          <Header as="h2" icon inverted>
            <Icon name="check circle outline" />
            Profile updated!
          </Header>
        </Dimmer>
      );
    } else {
      success = null;
    }

    return (
      <Form>
        {success}
        <Form.Group inline>
          <Form.Field>
            <label>First Name</label>
            <Input
              name="firstName"
              value={firstName || ""}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <Input
              name="lastName"
              value={lastName || ""}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group inline>
          <Form.Field>
            <label>Email Address</label>
            <Input
              name="email"
              value={email || ""}
              type="email"
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group inline>
          <Form.Field>
            <label>Phone</label>
            <Input
              name="phone"
              value={phone || ""}
              type="tel"
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group inline>
          {button}
          <PasswordModal updatePassword={this.props.updatePassword} />
        </Form.Group>
      </Form>
    );
  }
}
