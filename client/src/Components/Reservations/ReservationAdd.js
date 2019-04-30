import React, { Component } from "react";
import {
  Dropdown,
  Header,
  Input,
  Button,
  Statistic,
  Dimmer
} from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";
import axios from "axios";
import config from "config";
import moment from "moment";

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
      guestLoginCode: Math.floor(100000 + Math.random() * 900000),
      dimmerOpen: false
    };
  }

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
  successClose = () => {
    this.setState({ dimmerOpen: false });
    this.props.history.push("/dashboard/reservations");
  };
  handleSubmit = () => {
    const {
      assistant,
      guest,
      property,
      checkIn,
      checkOut,
      status,
      cleaningFee,
      guests,
      guestLoginCode
    } = this.state;
    const newReservation = {
      assistant: assistant,
      guest: guest,
      property: property,
      checkIn: checkIn,
      checkOut: checkOut,
      status: status,
      cleaningFee: cleaningFee,
      guests: guests,
      guestLoginCode: guestLoginCode
    };
    this.props.createReservation(newReservation).then(data => {
      if (data._id) {
        this.props
          .fetchProperty(this.state.property)
          .then(property => {
            if (this.props.property._id) {
              const msg = {
                to: this.state.guest.email,
                from: "info@roostr.io",
                subject: "Your stay is confirmed!",
                text: `Hello ${this.state.guest.firstName}! Your stay at ${
                  this.props.property.name
                } is confirmed for ${moment(this.state.checkIn).format(
                  "MM/DD"
                )} - ${moment(this.state.checkOut).format(
                  "MM/DD"
                )}. Check in time is 1:00 PM and check out is 11:00 AM. If you have any questions, please contact your property owner directly at ${
                  this.props.property.createdBy.email
                }. We hope you enjoy your stay! ~The Roostr Team`,
                html: `<h3>Hello ${
                  this.state.guest.firstName
                }!</h3><p>Your stay at ${
                  this.props.property.name
                } is confirmed for ${moment(this.state.checkIn).format(
                  "MM/DD"
                )} - ${moment(this.state.checkOut).format(
                  "MM/DD"
                )}. Check in time is <strong>1:00 PM</strong> and check out is <strong>11:00 AM</strong>.</p><p>If you have any questions, please contact the property owner directly at ${
                  this.props.property.createdBy.email
                }. We hope you enjoy your stay!</p><h4>~The Roostr Team</h4>`
              };
              axios
                .post(`${config.apiUrl}/api/sendgrid/mail/send`, msg)
                .then(response => {
                  if (response.status === 202) {
                    this.setState({ dimmerOpen: true });
                  } else {
                    window.alert(`failed with status code ${response.status}`);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { guest, guests } = this.state;
    return (
      <FlexColumn justifyBetween alignCenter width="full">
        <Dimmer
          active={this.state.dimmerOpen}
          page
          onClickOutside={this.successClose}
        >
          <Header as="h1" inverted>
            Your reservation has been created!
            <Header.Subheader
              style={{ marginTop: "2%", marginBottom: "1%" }}
              inverted
            >
              An email has been sent to your guest with reservation information.
            </Header.Subheader>
            <Link to="/dashboard/reservations">
              <Button inverted style={{ marginTop: "1%" }}>
                Return to Reservations
              </Button>
            </Link>
          </Header>
        </Dimmer>
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
                : this.props.properties &&
                  this.props.properties
                    .filter(p => p.active === true)
                    .map(p => ({
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
                : this.props.employees &&
                  this.props.employees.map(e => ({
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
    );
  }
}

export default ReservationAdd;
