import React, { Component } from "react";
import { Button, Header, Tab } from "semantic-ui-react";
import { FlexColumn, FlexRow, Divider } from "custom-components";
import ReservationListItem from "./ReservationListItem";

export default class ReservationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservations: nextProps.reservations.slice(0, 5),
      status: nextProps.status
    });
  }

  render() {
    const { reservations } = this.state;

    return (
      <FlexColumn width="800px" style={{ position: "relative" }}>
        {/*<Button attached="top" fluid>
          CREATE RESERVATION
        </Button>*/}
        {reservations.map((reservation, ind) => (
          <>
            <ReservationListItem reservation={reservation} />
            <Divider />
          </>
        ))}

        <Button color="green" attached="bottom" fluid>
          CREATE RESERVATION
        </Button>
      </FlexColumn>
    );
  }
}
