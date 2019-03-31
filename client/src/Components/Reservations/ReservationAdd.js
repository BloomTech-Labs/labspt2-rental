import React, { Component } from "react";
import {
  Dropdown,
  Header,
  Input,
  Button,
  Label,
  Statistic,
  Popup,
  Icon
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Text } from "custom-components";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

class ReservationAdd extends Component {
  constructor() {
    super();

    this.state = {
      assistant: null,
      guest: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null
      },
      property: null,
      checkIn: null,
      checkOut: null,
      status: "upcoming",
      cleaningFee: 0,
      guests: 1,
      guestLoginCode: Math.floor(100000 + Math.random() * 900000)
    };
  }

  componentDidMount() {
    this.props.fetchProperties();
    this.props.fetchEmployees();
  }

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ checkIn: startDate, checkOut: endDate });
  };

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleSubmit = () => {
    this.props
      .createReservation(this.state)
      .then(data => {
        if (data._id) {
          this.props.history.push("/dashboard/reservations");
        }
      })
      .catch(err => {});
  };

  render() {
    const { guest, guests } = this.state;

    return (
      <FlexColumn justifyBetween width="full">
        <Header as="h1">Add New Reservation</Header>
        <FlexRow>
          <Dropdown
            selection
            onChange={(e, val) => this.handleChange("property", val.value)}
            placeholder="Property"
            options={this.props.properties.map(p => ({
              key: p._id,
              text: p.name,
              value: p._id
            }))}
          />

          <DateRangePickerWrapper onChange={this.handleDateChange} />
        </FlexRow>

        <FlexRow>
          <Input
            placeholder="First Name"
            onChange={e =>
              this.handleChange("guest", {
                ...guest,
                firstName: e.target.value
              })
            }
          />
          <Input
            placeholder="Last Name"
            onChange={e =>
              this.handleChange("guest", {
                ...guest,
                lastName: e.target.value
              })
            }
          />
        </FlexRow>

        <FlexRow>
          <Input
            placeholder="Phone Number"
            onChange={e =>
              this.handleChange("guest", {
                ...guest,
                phoneNumber: e.target.value
              })
            }
          />

          <Input
            placeholder="Email"
            onChange={e =>
              this.handleChange("guest", {
                ...guest,
                email: e.target.value
              })
            }
          />
        </FlexRow>

        <FlexRow alignCenter>
          <Button
            circular
            icon="minus"
            onClick={() => this.handleChange("guests", guests - 1)}
          />
          <Statistic size="tiny" style={{ margin: "0 15px" }}>
            <Statistic.Label>Guests</Statistic.Label>
            <Statistic.Value>{guests}</Statistic.Value>
          </Statistic>
          <Button
            circular
            icon="plus"
            onClick={() => this.handleChange("guests", guests + 1)}
          />
        </FlexRow>

        <FlexRow>
          <Dropdown
            selection
            onChange={(e, val) => this.handleChange("assistant", val.value)}
            placeholder="Employee"
            options={this.props.employees.map(e => ({
              key: e._id,
              text: e.firstName + " " + e.lastName,
              value: e._id
            }))}
          />
        </FlexRow>

        <Button color="green" onClick={this.handleSubmit}>
          Create Reservation
        </Button>
      </FlexColumn>
    );
  }
}

export default ReservationAdd;
