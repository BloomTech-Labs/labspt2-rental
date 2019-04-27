import React, { Component } from "react";
import { Header, Input, Button, Divider } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";

class EmployeeAdd extends Component {
  constructor() {
    super();

    this.state = {
      employee: {
        firstName: null,
        lastName: null,
        email: null,
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
      id: null
    };
  }

  componentDidMount() {
    this.props.getUser();
  }
  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleSubmit = () => {
    const request = this.state.employee;
    request.address = this.state.address;
    request.password = this.state.newPassword;
    this.props
      .updateUser(request)
      .then(data => {
        if (data._id) {
          this.props.history.push("/dashboard/");
        }
      })
      .catch(err => {
        console.log("User not updated", err);
      });
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
              style={{ flexGrow: 1 }}
              className="space-bottom space-right"
              placeholder="Current Password"
              onChange={e =>
                this.handleChange("currentPassword", e.target.value)
              }
            />
            <Input
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

export default EmployeeAdd;
