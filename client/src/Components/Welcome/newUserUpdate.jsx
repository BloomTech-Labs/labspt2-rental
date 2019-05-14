import React, { Component } from "react";
import { Header, Input, Button, Divider, Dimmer } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import ErrorModal from "./ErrorModal";

class newUserUpdate extends Component {
  constructor() {
    super();

    this.state = {
      employee: {
        phone: null
      },
      address: {
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null
      },
      newPassword: null,
      currentPassword: null,
      id: null,
      errorModalOpen: false,
      modalMessage: "",
      dimmerOpen: false
    };
  }

  componentDidMount() {
    this.props.getUser();
  }
  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };
  modalClose = () => {
    this.setState({
      errorModalOpen: false
    });
  };
  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/dashboard/");
  };
  handleSubmit = () => {
    const { newPassword, currentPassword, employee, address } = this.state;
    if (newPassword === currentPassword) {
      this.setState({
        modalMessage: "Your new password cannot match your old password.",
        errorModalOpen: true
      });
    } else {
      const request = employee;
      request.address = address;
      this.props
        .updatePassword({
          oldPassword: currentPassword,
          newPassword: { password: newPassword }
        })
        .then(success => {
          this.props
            .updateUser(request)
            .then(data => {
              if (this.props.user._id) {
                this.setState({ dimmerOpen: true });
                const thanksEmail = {
                  to: this.props.user.email,
                  from: "welcome@roostr.io",
                  subject: "You're In!",
                  text: `Hello ${
                    this.props.user.firstName
                  }! You're all set! Thank you for updating your registration information! Please follow the link below to sign in with your email address your new password. We hope you enjoy working with us. Thank you for being a part of the Roostr team! Temporary Password: changeme Login Link: https://www.roostr.tech/`,
                  html: `<h2>Hello ${
                    this.props.user.firstName
                  }!</h2><p>You're all set! Thank you for updating your registration information!</p><p>Please follow the link below to sign in with your email address your new password. We hope you enjoy working with us.</p><h4>Welcome to the Roostr team!</h4><p><strong>Login Link:</strong><a href="https://www.roostr.tech/
                  ">https://www.roostr.tech/</a></p>`
                };
                this.props.sendEmail(thanksEmail);
              }
            })
            .catch(err => {
              this.setState({
                errorModalOpen: true,
                modalMessage:
                  "Could not update your information. Please try again."
              });
            });
        })
        .catch(err => {
          this.setState({
            errorModalOpen: true,
            modalMessage: "Could not update your information. Please try again."
          });
        });
    }
  };

  render() {
    const { employee, address } = this.state;
    return (
      <FlexColumn
        justifyBetween
        alignCenter
        width="80%"
        style={{ marginLeft: "10%", marginTop: "10%" }}
      >
        <ErrorModal
          open={this.state.errorModalOpen}
          size="small"
          modalMessage={this.state.modalMessage}
          modalClose={this.modalClose}
        />
        <Dimmer
          active={this.state.dimmerOpen}
          size="fullscreen"
          page
          onClickOutside={this.successClose}
        >
          {" "}
          <Header as="h1" inverted>
            Thank you for updating your information!
            <Header.Subheader>
              Click to continue to the Dashboard.
            </Header.Subheader>
          </Header>
        </Dimmer>
        <FlexRow width="full">
          <Header as="h2">
            Welcome to Roostr! Please update your information. All fields are
            required.
          </Header>
        </FlexRow>

        <br />
        <br />
        <FlexRow width="full">
          <Input
            style={{ marginRight: "10px", flexGrow: "1" }}
            placeholder={this.props.user.firstName}
            defaultValue={this.props.user.firstName}
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                firstName: e.target.value
              })
            }
          />
          <Input
            style={{ flexGrow: "1" }}
            placeholder={this.props.user.lastName}
            defaultValue={this.props.user.lastName}
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                lastName: e.target.value
              })
            }
          />
        </FlexRow>

        <br />

        <FlexRow width="full">
          <Input
            required
            style={{ marginRight: "10px", flexGrow: "1" }}
            placeholder="Phone Number"
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                phone: e.target.value
              })
            }
          />

          <Input
            style={{ flexGrow: "1" }}
            placeholder={this.props.user.email}
            defaultValue={this.props.user.email}
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                email: e.target.value
              })
            }
          />
        </FlexRow>

        <Divider style={{ width: "100%" }} />

        <FlexColumn width="full">
          <Input
            required
            style={{ width: "100%" }}
            className="space-bottom"
            placeholder="Address 1"
            onChange={e =>
              this.handleChange("address", {
                ...address,
                address1: e.target.value
              })
            }
          />
          <Input
            style={{ width: "100%" }}
            className="space-bottom"
            placeholder="Address 2"
            onChange={e =>
              this.handleChange("address", {
                ...address,
                address2: e.target.value
              })
            }
          />
          <FlexRow width="full">
            <Input
              required
              style={{ flexGrow: 6 }}
              className="space-bottom space-right"
              placeholder="City"
              onChange={e =>
                this.handleChange("address", {
                  ...address,
                  city: e.target.value
                })
              }
            />
            <Input
              required
              style={{ flexGrow: 1 }}
              className="space-bottom space-right"
              placeholder="State"
              onChange={e =>
                this.handleChange("address", {
                  ...address,
                  state: e.target.value
                })
              }
            />
            <Input
              required
              style={{ flexGrow: 3 }}
              className="space-bottom"
              placeholder="Zip Code"
              onChange={e =>
                this.handleChange("address", {
                  ...address,
                  zip: e.target.value
                })
              }
            />
          </FlexRow>
          <FlexRow width="full">
            <Input
              required
              type="password"
              style={{ flexGrow: 1 }}
              className="space-bottom space-right"
              placeholder="Current Password"
              onChange={e =>
                this.handleChange("currentPassword", e.target.value)
              }
            />
            <Input
              required
              type="password"
              style={{ flexGrow: 1 }}
              className="space-bottom space-right"
              placeholder="New Password"
              onChange={e => this.handleChange("newPassword", e.target.value)}
            />
          </FlexRow>
        </FlexColumn>

        <br />
        <br />

        <FlexRow width="full" justifyCenter>
          <Button color="blue" onClick={this.handleSubmit}>
            Update
          </Button>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default newUserUpdate;
