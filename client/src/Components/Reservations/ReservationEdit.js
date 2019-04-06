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
import { Link } from "react-router-dom";
import DateRangePickerWrapper from "./ReservationAdd";

class ReservationEdit extends Component {
  state = {
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

  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchProperties();
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
    const reservation = this.props.reservations.find(
      r => r._id === this.props.match.params.id
    );

    const { guest, guests } = this.state;

    return (
      <>
        {reservation && (
          <FlexColumn justifyBetween alignCenter width="full">
            <FlexRow width="full">
              <Header as="h1">Add New Reservation</Header>
            </FlexRow>

            <br />

            <FlexRow width="full">
              <DateRangePickerWrapper onChange={this.handleDateChange} />
            </FlexRow>

            <br />
            <br />

            <FlexRow alignCenter width="full">
              <Dropdown
                style={{ marginRight: "10px" }}
                selection
                onChange={(e, val) => this.handleChange("property", val.value)}
                placeholder="Property"
                options={
                  this.props.loading
                    ? [{ text: "Loading...", value: "loading" }]
                    : this.props.properties.map(p => ({
                        key: p._id,
                        text: p.name,
                        value: p._id
                      }))
                }
              />

              <Dropdown
                selection
                onChange={(e, val) => this.handleChange("assistant", val.value)}
                placeholder="Employee"
                options={
                  this.props.loading
                    ? [{ text: "Loading...", value: "loading" }]
                    : this.props.employees.map(e => ({
                        key: e._id,
                        text: e.firstName + " " + e.lastName,
                        value: e._id
                      }))
                }
              />
            </FlexRow>

            <br />

            <FlexRow width="full">
              <Input
                style={{ marginRight: "10px", flexGrow: "1" }}
                placeholder="First Name"
                onChange={e =>
                  this.handleChange("guest", {
                    ...guest,
                    firstName: e.target.value
                  })
                }
              />
              <Input
                style={{ flexGrow: "1" }}
                placeholder="Last Name"
                onChange={e =>
                  this.handleChange("guest", {
                    ...guest,
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
                  this.handleChange("guest", {
                    ...guest,
                    phoneNumber: e.target.value
                  })
                }
              />

              <Input
                style={{ flexGrow: "1" }}
                placeholder="Email"
                onChange={e =>
                  this.handleChange("guest", {
                    ...guest,
                    email: e.target.value
                  })
                }
              />
            </FlexRow>

            <br />
            <br />

            <FlexRow alignCenter justifyCenter width="full">
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

            <br />

            <FlexRow width="full" justifyCenter>
              <Button color="green" onClick={this.handleSubmit}>
                Create Reservation
              </Button>
            </FlexRow>
          </FlexColumn>
        )}
      </>
    );
  }
}

export default ReservationEdit;
