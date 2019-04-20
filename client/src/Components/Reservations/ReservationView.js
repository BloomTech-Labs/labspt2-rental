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

class ReservationView extends Component {
  render() {
    const reservation = this.props.reservations.find(
      r => r._id === this.props.match.params.id
    );

    return (
      <>
        {reservation && (
          <FlexColumn justifyBetween alignCenter width="full">
            <FlexRow width="full" spaceBottom>
              <Header as="h1">Booking ID: {reservation._id}</Header>
            </FlexRow>

            <b>
              {reservation.guest.firstName}&nbsp;{reservation.guest.lastName}
            </b>
            <span>{reservation.guest.email}</span>
            <span>{reservation.guest.phoneNumber}</span>

            <FlexColumn spaceTop>
              <FlexRow>
                <b>{reservation.property.name}:</b>&nbsp;
                {reservation.property.address1}
              </FlexRow>
              <FlexRow>
                <b>Check In:</b>&nbsp;{reservation.checkIn}
              </FlexRow>
              <FlexRow>
                <b>Check Out:</b>&nbsp;{reservation.checkOut}
              </FlexRow>
              <FlexRow>
                <b>Guests:</b>&nbsp;{reservation.guests}
              </FlexRow>
              <FlexRow>
                <b>Paid:</b>&nbsp;{reservation.paid || "false"}
              </FlexRow>
            </FlexColumn>

            <FlexRow width="full" spaceTop alignEnd>
              <Link to={`/dashboard/reservations/edit/${reservation._id}`}>
                <Button>Edit</Button>
              </Link>
              <Button color="purple">Send Invoice</Button>
              <Link to={`/dashboard/checkout/${reservation._id}`} >
                <Button color="blue">Process Payment</Button>
              </Link>
            </FlexRow>
          </FlexColumn>
        )}
      </>
    );
  }
}

export default ReservationView;
