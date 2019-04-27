import React from "react";
import moment from "moment";
import InfoCard from "../shared/Card/InfoCard";

const ReservationListItem = ({ reservation }) => {
  return (
    <InfoCard link={`/dashboard/reservations/view/${reservation._id}`}>
      <InfoCard.Image>{reservation.property.image}</InfoCard.Image>
      <InfoCard.Title>
        {reservation.guest.firstName}&nbsp;{reservation.guest.lastName}
      </InfoCard.Title>
      <InfoCard.Label
        hover={`${reservation.property.address1} ${reservation.property.city} ${
          reservation.property.state
        } ${reservation.property.zip}`}
      >
        {reservation.property.name}
      </InfoCard.Label>
      <InfoCard.ID>{reservation._id}</InfoCard.ID>
      <InfoCard.StatA label="Check In">
        {moment(reservation.checkIn).format("MM/DD")}
      </InfoCard.StatA>
      <InfoCard.StatB label="Check Out">
        {moment(reservation.checkOut).format("MM/DD")}
      </InfoCard.StatB>
    </InfoCard>
  );
};

export default ReservationListItem;
