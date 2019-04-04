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

class ReservationView extends Component {
  render() {
    const reservation = this.props.reservations.find(
      r => r._id === this.props.match.params.id
    );

    return (
      <FlexColumn justifyBetween alignCenter width="full">
        <FlexRow width="full">
          <Header as="h1">
            Booking ID: {reservation ? reservation._id : reservation}
          </Header>
        </FlexRow>

        <br />
      </FlexColumn>
    );
  }
}

export default ReservationView;
