import React, { Component } from "react";
import { Dropdown, Header, Input, Button, Statistic } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker.jsx";

class ReservationEdit extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchSingleReservation(this.props.match.params.id);
    this.props.fetchEmployees();
    this.props.fetchProperties();
  }

  static getDerivedStateFromProps(props, state) {
    if (!state._id && props.reservation._id) {
      return props.reservation;
    }
    return null;
  }

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ checkIn: startDate, checkOut: endDate });
  };

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleSubmit = () => {
    this.props
      .updateReservation(this.state)
      .then(data => {
        if (data._id) {
          this.props.history.push("/dashboard/reservations");
        }
      })
      .catch(err => {});
  };
  render() {
    const { loading } = this.props;
    const { guest, guests, ...reservation } = this.state;

    return loading ? (
      "Loading"
    ) : (
      <>
        {reservation._id && (
          <FlexColumn justifyBetween alignCenter width="full">
            <FlexRow width="full">
              <Header as="h1">Edit Reservation</Header>
            </FlexRow>

            <br />

            <FlexRow width="full">
              <DateRangePickerWrapper
                onChange={this.handleDateChange}
                initialStartDate={new Date(reservation.checkIn)}
                initialEndDate={new Date(reservation.checkOut)}
              />
            </FlexRow>

            <br />
            <br />

            <FlexRow alignCenter width="full">
              <Dropdown
                value={reservation.property._id}
                style={{ marginRight: "10px" }}
                selection
                onChange={(e, val) => this.handleChange("property", val.value)}
                placeholder="Property"
                options={
                  this.props.loading
                    ? [{ text: "Loading...", value: "loading" }]
                    : this.props.properties &&
                      this.props.properties.map(p => ({
                        key: p._id,
                        text: p.name,
                        value: p._id
                      }))
                }
              />

              <Dropdown
                value={reservation.assistant._id}
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
                value={guest.firstName}
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
                value={guest.lastName}
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
                value={guest.phoneNumber}
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
                value={guest.email}
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

            <FlexRow width="full" justifyBetween spaceTop="20px">
              <Link
                to={`/dashboard/reservations/view/${
                  this.props.match.params.id
                }`}
              >
                <Button basic onClick={this.handleSubmit}>
                  Go Back
                </Button>
              </Link>

              <Button color="blue" onClick={this.handleSubmit}>
                Update Reservation
              </Button>
            </FlexRow>
          </FlexColumn>
        )}
      </>
    );
  }
}

export default ReservationEdit;
