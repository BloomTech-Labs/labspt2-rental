import React from "react";
import { Pagination } from "semantic-ui-react";
import { FlexColumn, Divider } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";

const EmployeeList = props => {

    const employees = props.employees;
    // const { pageSize } = props;

    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <Pagination
          className="space-bottom"
          boundaryRange={1}
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          ellipsisItem={null}
          siblingRange={1}
          totalPages={props.numPages}
        />
        {employees.map(item => (
          <>
            <EmployeeListItem key={item._id} employee={item} />
            <Divider />
          </>
        ))}
      </FlexColumn>
    );
  }

export default EmployeeList;
