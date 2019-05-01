import React from "react";
import InfoCard from "../shared/Card/InfoCard";

const PropertyCard = props => {
  return (
    <InfoCard link={props.linkto}>
      <InfoCard.Image>{props.image}</InfoCard.Image>
      <InfoCard.Title>{props.address}</InfoCard.Title>
      <InfoCard.Label hover={props.addressFull}>{props.name}</InfoCard.Label>
      <InfoCard.ID>{props.id}</InfoCard.ID>
      <InfoCard.StatA label="Assistants">{props.assistants}</InfoCard.StatA>
      <InfoCard.StatB label="Occupants">{props.occupants}</InfoCard.StatB>
    </InfoCard>
  );
};

export default PropertyCard;
