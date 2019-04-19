import React from "react";
import {
  Image,
  Header,
  Button,
  Label,
  Statistic,
  Popup,
  Icon
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Text } from "custom-components";
import moment from "moment";
import { Link } from "react-router-dom";

const ReservationListItem = ({ reservation }) => {
  return (
    <FlexRow alignCenter justifyBetween width="full" wrap>
      <Image rounded src={reservation.property.image} size="small" />

      <FlexColumn
        grow="1"
        spaceLeft="20px"
        spaceBottom
        style={{ height: "100px" }}
      >
        <FlexRow alignCenter spaceBottom="20px" spaceRight>
          <Header size="medium" style={{ margin: "0" }}>
            {reservation.guest.firstName}&nbsp;{reservation.guest.lastName}
            &nbsp;
          </Header>

          <Popup
            trigger={
              <Label circular>
                <Icon fitted name="info" />
              </Label>
            }
            content={reservation._id}
          />
        </FlexRow>

        <Popup
          trigger={
            <Label
              as="a"
              color="blue"
              content={reservation.property.name}
              icon="home"
            />
          }
          content={`${reservation.property.address1} ${
            reservation.property.city
          } ${reservation.property.state} ${reservation.property.zip}`}
        />
      </FlexColumn>

      <FlexRow grow="1" spaceRight="20px">
        <Statistic size="tiny" style={{ margin: "0 15px 0 0" }}>
          <Statistic.Label>Check In</Statistic.Label>
          <Statistic.Value>
            {moment(reservation.checkIn).format("MM/DD")}
          </Statistic.Value>
        </Statistic>

        <Statistic size="tiny" style={{ margin: "0 15px" }}>
          <Statistic.Label>Check Out</Statistic.Label>
          <Statistic.Value>
            {moment(reservation.checkOut).format("MM/DD")}
          </Statistic.Value>
        </Statistic>
      </FlexRow>

      <FlexColumn>
        <Link to={`/dashboard/reservations/view/${reservation._id}`}>
          <Button style={{ margin: "10px 0" }}>More Info</Button>
        </Link>
      </FlexColumn>
    </FlexRow>
  );
};

export default ReservationListItem;
