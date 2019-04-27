import React from "react";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";

const EmployeePropertyCard = props => {
  return (
    <Link
      to={`/dashboard/properties/view/${props.property._id}`}
      style={{ width: "75%", textAlign: "center" }}
    >
      <Segment raised>{props.property.name}</Segment>
    </Link>
  );
};

export default EmployeePropertyCard;
