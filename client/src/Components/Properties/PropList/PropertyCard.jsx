import React from "react";
import InfoCard from "../../shared/Card/InfoCard";

const PropertyCard = props => {
  return (
    <InfoCard
      imageLoc={props.property.image}
      header={props.property.name}
      lineOneTitle="Address:"
      lineTwoTitle="Employee:"
      lineThreeTitle="Max Guests:"
      lineOneInfo={props.property.address}
      lineTwoInfo={props.property.assistants}
      lineThreeInfo={props.property.occupants}
      buttonFunction={() => props.clickHandler(props.property.id)}
    />
  );
};

export default PropertyCard;
