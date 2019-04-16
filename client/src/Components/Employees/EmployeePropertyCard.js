import React from "react";
import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";
import { FlexRow, Container, FlexColumn } from "custom-components";

const EmployeePropertyCard = props => {
  return (
    <Link to={`/dashboard/properties/${props.property._id}`} style={{ width: "75%", textAlign: "center" }} >
      <Segment  raised>
        {props.property.name}
      </Segment>
    </Link>
  );
};

export default EmployeePropertyCard;
