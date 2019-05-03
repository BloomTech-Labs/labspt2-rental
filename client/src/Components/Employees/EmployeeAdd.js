import React, { Component } from "react";
import { Header, Input, Button, Dropdown, Dimmer } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";

class EmployeeAdd extends Component {
  constructor() {
    super();

    this.state = {
      employee: {
        firstName: null,
        lastName: null,
        email: null
      },
      permissions: {
        task: false,
        property: false,
        checkout: false
      },
      username: null,
      password: null,
      id: null,
      dimmerOpen: false
    };
  }

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/dashboard/employees");
  };

  handleSubmit = () => {
    const request = this.state.employee;
    request.permissions = this.state.permissions;
    request.username = `${request.lastName
      .slice(0, 4)
      .toLowerCase()}_${request.firstName.toLowerCase()}`;
    request.password = "changeme";
    request.role = "employee";
    this.props
      .createEmployee(request)
      .then(data => {
        if (data._id) {
          const welcomeEmail = {
            to: this.state.employee.email,
            from: "welcome@roostr.io",
            subject: "Welcome To Roostr!",
            text: `Hello ${
              this.state.employee.firstName
            }! Welcome to the team! You're receiving this email because your employer would like to invite you to create a user account where you can see upcoming tasks, manage reservations, and more. Please follow the link below and sign in with your email address and the provided password. Once you've signed in, you can update your personal information and change your password. Thank you for being a part of the Roostr team! Temporary Password: changeme Login Link: https://www.roostr.tech/welcome/${
              data._id
            }`,
            html: `<h2>Hello ${
              this.state.employee.firstName
            }!</h2><p>Welcome to the team! You're receiving this email because your employer would like to invite you to create a user account where you can see upcoming tasks, manage reservations, and more.</p><p>Please follow the link below and sign in with the provided credentials. Once you've signed in, you can update your personal information and change your password.</p><h4>Welcome to the Roostr team!</h4><p><strong>Temporary Password:</strong> changeme</p><p><strong>Login Link:</strong><a href="https://www.roostr.tech/welcome/${
              this.state.id
            }">https://www.roostr.tech/welcome</a></p>`
          };
          this.props.sendEmail(welcomeEmail);
          this.setState({
            dimmerOpen: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { employee, permissions } = this.state;
    const permissionValues = [
      {
        key: "yes",
        text: "Yes",
        value: true
      },
      {
        key: "no",
        text: "No",
        value: false
      }
    ];

    return (
      <FlexColumn
        justifyBetween
        alignCenter
        width="80%"
        style={{ padding: "2%" }}
      >
        <Dimmer
          active={this.state.dimmerOpen}
          size="fullscreen"
          page
          onClickOutside={this.successClose}
        >
          {" "}
          <Header as="h1" inverted>
            Your employee has been created and a welcome email has been sent.
            <Header.Subheader>
              Click to continue to your employee list.
            </Header.Subheader>
          </Header>
        </Dimmer>
        <FlexRow width="full">
          <Header as="h1">Add New Employee</Header>
        </FlexRow>

        <br />
        <br />
        <FlexRow width="full">
          <Input
            style={{ marginRight: "10px", flexGrow: "1" }}
            placeholder="First Name"
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                firstName: e.target.value
              })
            }
          />
          <Input
            style={{ flexGrow: "1" }}
            placeholder="Last Name"
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                lastName: e.target.value
              })
            }
          />
        </FlexRow>

        <br />

        <FlexRow width="100%" alignCenter>
          <Input
            style={{ width: "100%", flexGrow: "1" }}
            placeholder="Email"
            onChange={e =>
              this.handleChange("employee", {
                ...employee,
                email: e.target.value
              })
            }
          />
        </FlexRow>

        <br />
        <br />

        <FlexColumn>
          <Dropdown
            text="Re-assign tasks?"
            defaultValue={false}
            onChange={(e, val) =>
              this.handleChange("permissions", {
                ...permissions,
                task: val.value
              })
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Yes" value="true" key="yes" />
              <Dropdown.Item text="No" value="false" key="no" />
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Dropdown
            text="Re-assign properties?"
            defaultValue={false}
            onChange={(e, val) =>
              this.handleChange("permissions", {
                ...permissions,
                property: val.value
              })
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Yes" value="true" key="yes" />
              <Dropdown.Item text="No" value="false" key="no" />
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Dropdown
            text="Process payments?"
            defaultValue={false}
            onChange={(e, val) =>
              this.handleChange("permissions", {
                ...permissions,
                checkout: val.value
              })
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Yes" value="true" key="yes" />
              <Dropdown.Item text="No" value="false" key="no" />
            </Dropdown.Menu>
          </Dropdown>
        </FlexColumn>

        <br />
        <br />

        <FlexRow width="full" justifyCenter>
          <Button color="green" onClick={this.handleSubmit}>
            Send Welcome Email
          </Button>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default EmployeeAdd;
