import React, { Component } from "react";
import { Header, Input, Button, Divider, Dropdown } from "semantic-ui-react";
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
      permissions: {
        task: false,
        property: false,
        checkout: false
      },
      username: null,
      password: null
    };
  }

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleSubmit = () => {
    const request = this.state.employee;
    request.address = this.state.address;
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
          this.props.history.push("/dashboard/employees");
        }
      })
      .catch(err => {
        console.log("blah");
      });
  };

  render() {
    const { employee, address, permissions } = this.state;
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
        style={{ marginLeft: "10%" }}
      >
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
            placeholder="Email"
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
        </FlexColumn>

        <br />
        <br />

        <FlexColumn width="50%">
          <div>
            Can re-assign tasks
            <Dropdown
              className="space-left-20"
              inline
              options={permissionValues}
              defaultValue={false}
              onChange={(e, val) =>
                this.handleChange("permissions", {
                  ...permissions,
                  task: val.value
                })
              }
            />
          </div>
          <br />
          <div>
            Can re-assign properties{"   "}
            <Dropdown
              className="space-left-20"
              inline
              options={permissionValues}
              defaultValue={false}
              onChange={(e, val) =>
                this.handleChange("permissions", {
                  ...permissions,
                  property: val.value
                })
              }
            />
          </div>
          <br />
          <div>
            Can bill guests{"   "}
            <Dropdown
              className="space-left-20"
              inline
              options={permissionValues}
              defaultValue={false}
              onChange={(e, val) =>
                this.handleChange("permissions", {
                  ...permissions,
                  checkout: val.value
                })
              }
            />
          </div>
        </FlexColumn>

        <br />
        <br />

        <FlexRow width="full" justifyCenter>
          <Button color="green" onClick={this.handleSubmit}>
            Add Employee
          </Button>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default EmployeeAdd;
