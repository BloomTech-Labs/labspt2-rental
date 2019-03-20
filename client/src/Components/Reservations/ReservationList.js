import React, { Component } from "react";
import { Button, Header, Tab, Pagination } from "semantic-ui-react";
import { FlexColumn, Divider } from "custom-components";
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
      reservations: nextProps.reservations,
      status: nextProps.status
    });
  }

  render() {
    const { reservations } = this.state;
    const { pageSize } = this.props;

    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <Pagination
          style={{ marginBottom: "10px" }}
          boundaryRange={1}
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={10}
        />
        {reservations.map((reservation, ind) => (
          <>
            <ReservationListItem reservation={reservation} />
            {/* <Divider /> */}
          </>
        ))}

        <Button color="green" attached="bottom" fluid>
          CREATE RESERVATION
        </Button>
      </FlexColumn>
    );
  }
}
