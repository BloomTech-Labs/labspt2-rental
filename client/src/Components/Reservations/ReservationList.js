import React from "react";
import { Pagination } from "semantic-ui-react";
import { FlexColumn, FlexRow, Divider, ResponsiveDiv } from "custom-components";
import ReservationListItem from "./ReservationListItem";



export default props => {
  const { reservations, loading, handlePageChange, count } = props;

  return (
    <FlexColumn alignCenter style={{ position: "relative" }}>
      <FlexRow spaceBottom="20px" alignCenter justifyCenter width="full">
        <Pagination
          onPageChange={handlePageChange}
          boundaryRange={1}
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={count}
        />
      </FlexRow>

      {!loading &&
        reservations.length &&
        reservations.map((reservation, ind) => (
          <ResponsiveDiv key={ind}>
            <ReservationListItem reservation={reservation} />
            <Divider />
          </ResponsiveDiv>
        ))}
    </FlexColumn>
  );
};
