import React from "react";
import { Pagination } from "semantic-ui-react";
import { FlexColumn, Divider, FlexRow } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";

import taskPropertyAssign from "./taskPropertyHelper";

const EmployeeList = props => {
  const { page, handlePageChange, loading } = props;
  const numPages = props.numPages ? props.numPages : 0;

  // modEmployees is used as a temp replacement for employees because employees is read-only at this point and cannot be directly modified
  const modEmployees = taskPropertyAssign(props);
  return (
    <FlexColumn width="full" alignCenter>
      <FlexRow width="full" justifyCenter spaceBottom="20px">
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
      </FlexRow>
      {!loading ? (
        modEmployees.map(item => (
          <div key={item._id}>
            <EmployeeListItem employee={item} />
            <Divider />
          </div>
        ))
      ) : (
        <div>Please wait...</div>
      )}
    </FlexColumn>
  );
};

export default EmployeeList;
