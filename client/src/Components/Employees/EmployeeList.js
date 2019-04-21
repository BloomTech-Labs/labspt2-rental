import React from "react";
import { Pagination, Button } from "semantic-ui-react";
import { FlexColumn, Divider, FlexRow } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";
import { Link } from "react-router-dom";

import taskPropertyAssign from "./taskPropertyHelper";

const EmployeeList = props => {
  const { numPages, page, handlePageChange } = props;

  // modEmployees is used as a temp replacement for employees because employees is read-only at this point and cannot be directly modified
  const modEmployees = taskPropertyAssign(props);

  return (
    <FlexColumn width="full" alignCenter >
      <FlexRow>
        <Pagination
          onPageChange={handlePageChange}
          className="space-bottom"
          boundaryRange={0}
          defaultActivePage={page}
          firstItem={null}
          lastItem={null}
          ellipsisItem={null}
          siblingRange={1}
          totalPages={numPages}
        />
        <Link to="/dashboard/employees/add">
          <Button
            className="space-left-20"
            circular
            icon="plus"
            color="orange"
          />
        </Link>
      </FlexRow>
      {modEmployees.map(item => (
        <>
          <EmployeeListItem key={item._id} employee={item} />
          <Divider />
        </>
      ))}
    </FlexColumn>
  );
};

export default EmployeeList;
