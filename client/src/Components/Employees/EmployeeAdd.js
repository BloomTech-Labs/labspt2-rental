import React, { Component } from "react";
import {
  Dropdown,
  Header,
  Input,
  Button,
  Divider,
  Label,
  Statistic,
  Popup,
  Icon
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Text } from "custom-components";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

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
    request.username = `${request.lastName.slice(0, 4).toLowerCase()}_${request.firstName.toLowerCase()}`;
    request.password="changeme";
    console.log(request)
    this.props
      .createEmployee(request)
      .then(data => {
        if (data._id) {
          // this.props.history.push("/dashboard/employees");
        }
      })
      .catch(err => {});
  };

  render() {
    const { employee, address } = this.state;

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
