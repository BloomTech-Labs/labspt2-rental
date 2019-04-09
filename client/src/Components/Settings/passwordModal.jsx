import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Message,
  Divider,
  Dimmer,
  Header,
  Icon
} from "semantic-ui-react";

export default class PasswordModal extends Component {
  state = {
    open: false,
    oldPassword: "",
    newPassword: "",
    checkPassword: "",
    disabled: true,
    message: "",
    active: false
  };

  close = () => this.setState({ open: false });

  show = () => this.setState({ open: true });

  dimmerClose = () => this.setState({ active: false, open: false });

  handleChange = e => {
    const { newPassword, oldPassword } = this.state;

    if (e.target.name === "newPassword") {
      if (e.target.value === "") {
        this.setState({
          message: "newPassword"
        });
      }
    } else if (e.target.name === "checkPassword") {
      if (e.target.value === newPassword && oldPassword !== "") {
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

  handleSubmit = e => {
    e.preventDefault();
    const { newPassword, checkPassword, oldPassword } = this.state;
    if (newPassword !== checkPassword) {
      this.setState({
        message: "mismatch"
      });
    } else {
      this.props
        .updatePassword({
          oldPassword: oldPassword,
          newPassword: { password: newPassword }
        })
        .then(success => {
          this.setState({
            active: true
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const {
      open,
      oldPassword,
      newPassword,
      checkPassword,
      disabled,
      message,
      active
    } = this.state;

    let button;
    if (disabled) {
      button = <Button disabled>Update</Button>;
    } else {
      button = (
        <Button basic color="blue" onClick={this.handleSubmit} active>
          Update
        </Button>
      );
    }

    let messageAlert;
    if (message === "mismatch") {
      messageAlert = <Message size="tiny">New passwords must match!</Message>;
    } else if (message === "newPassword") {
      messageAlert = <Message size="tiny">Need a new password!</Message>;
    } else {
      messageAlert = <Divider section />;
    }

    let success;
    if (active) {
      success = (
        <Dimmer active onClickOutside={this.dimmerClose} page>
          <Header as="h2" icon inverted>
            <Icon name="check circle outline" />
            Password updated!
          </Header>
        </Dimmer>
      );
    } else {
      success = null;
    }

    return (
      <div>
        <Button basic color="blue" onClick={this.show}>
          Change Password
        </Button>

        <Modal size="mini" open={open} onClose={this.close}>
          <Modal.Header>Update Password</Modal.Header>

          {/* Inline isn't working? */}
          <Modal.Content>
            {success}
            <Form>
              <Form.Group inline>
                <Form.Field required>
                  <label>Old Password</label>
                  <Form.Input
                    name="oldPassword"
                    value={oldPassword}
                    type="password"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group inline>
                <Form.Field required>
                  <label>New Password</label>
                  <Form.Input
                    name="newPassword"
                    value={newPassword}
                    type="password"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group inline>
                <Form.Field required>
                  <label>New Password</label>
                  <Form.Input
                    name="checkPassword"
                    value={checkPassword}
                    type="password"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>
            </Form>

            {messageAlert}
          </Modal.Content>

          <Modal.Actions>
            <Button basic color="red" onClick={this.close}>
              Cancel
            </Button>
            {button}
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
