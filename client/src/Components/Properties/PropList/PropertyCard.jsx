import React from "react";
import InfoCard from "../../shared/Card/InfoCard";

const PropertyCard = props => {
  return (
    <InfoCard
      imageLoc={props.image}
      header={props.name}
      lineOneTitle="Address"
      lineTwoTitle="Employee"
      lineThreeTitle="Max Guests"
      lineOneInfo={props.address}
      lineTwoInfo={props.assistants}
      lineThreeInfo={props.occupants}
    />
  );
};

export default PropertyCard;
