import React, { Component } from "react";
import { Button, Header, Tab } from "semantic-ui-react";
import { FlexColumn, FlexRow, Divider } from "custom-components";
import ReservationListItem from "./ReservationListItem";

export default class ReservationList extends Component {
  constructor() {
    super();
  }

  render() {
    const { status } = this.props;

    return (
      <FlexColumn width="800px" style={{ position: "relative" }}>
        {/*<Button attached="top" fluid>
          CREATE RESERVATION
        </Button>*/}
        <ReservationListItem />
        <Divider />
        {/*Here we'll map each item from data fetched from the server and filter by status*/}
        <Button color="green" attached="bottom" fluid>
          CREATE RESERVATION
        </Button>
      </FlexColumn>
    );
  }
}
