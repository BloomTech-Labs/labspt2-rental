import React from "react";
import { Pagination } from "semantic-ui-react";
import { FlexColumn, Divider } from "custom-components";
import PropertyCard from "./PropertyCard";

export default props => {
  const { properties, loading, handlePageChange, count } = props;

  return (
    <FlexColumn alignCenter style={{ position: "relative" }}>
      <Pagination
        className="space-bottom"
        onPageChange={handlePageChange}
        boundaryRange={1}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={count}
      />
      {!loading &&
        properties.length &&
        properties.map(property => (
          <div key={property._id}>
            <PropertyCard
              id={property._id}
              image={property.image}
              name={property.name}
              address={property.address1}
              addressFull={
                property.address1 +
                " " +
                property.city +
                " " +
                property.state +
                " " +
                property.zip
              }
              assistants={
                property.assistants != null && property.assistants.length
                  ? `${property.assistants[0].firstName}`
                  : "Not Assigned"
              }
              occupants={property.occupants}
              buttonFunction={() => props.cardHandleClick(property._id)}
              linkto={`/dashboard/properties/view/${property._id}`}
            />
            <Divider />
          </div>
        ))}
    </FlexColumn>
  );
};
