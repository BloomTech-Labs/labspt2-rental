import React from "react";
import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";
import { FlexRow } from "custom-components";

const EmployeePropertyCard = props => {
  return (
    <FlexRow width="full">
      <Link
        to={`/dashboard/properties/view/${props.property._id}`}
        style={{ width: "75%", textAlign: "center" }}
      >
        <Segment raised>{props.property.name}</Segment>
      </Link>
      <Button
        className="space-left-20 space-top"
        circular
        disabled={!props.propPermissions}
        icon="x"
        color="red"
        size="mini"
        onClick={e => props.removeEmplFromProperty(e, props.property._id)}
      />
    </FlexRow>
  );
};

export default EmployeePropertyCard;
