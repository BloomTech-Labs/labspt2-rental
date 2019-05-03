import React from "react";
import { Pagination } from "semantic-ui-react";
import { FlexColumn, FlexRow, Divider } from "custom-components";
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
          <div key={ind}>
            <ReservationListItem reservation={reservation} />
            <Divider />
          </div>
        ))}
    </FlexColumn>
  );
};
