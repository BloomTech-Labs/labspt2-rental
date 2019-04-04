import React from "react";
import { Button, Header, Tab, Pagination } from "semantic-ui-react";
import { FlexColumn, Divider } from "custom-components";
import ReservationListItem from "./ReservationListItem";
import { Link } from "react-router-dom";

export default props => {
  const { reservations, loading, handlePageChange, count } = props;

  return (
    <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
      <Pagination
        className="space-bottom"
        onPageChange={handlePageChange}
        boundaryRange={1}
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={count}
      />
      {!loading &&
        reservations.length &&
        reservations.map((reservation, ind) => (
          <>
            <ReservationListItem reservation={reservation} />
            <Divider />
          </>
        ))}

      <Link to="/dashboard/reservations/add" style={{ width: "100%" }}>
        <Button color="green" attached="bottom" fluid>
          CREATE RESERVATION
        </Button>
      </Link>
    </FlexColumn>
  );
};
