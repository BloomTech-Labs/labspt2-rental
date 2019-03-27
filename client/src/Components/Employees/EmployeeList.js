import React, { Component } from "react";
import { Button, Pagination, Icon, Input } from "semantic-ui-react";
import { FlexRow, FlexColumn, Divider } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeSingle from "./EmployeeSingle";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: true,
      employees: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      employees: nextProps.employees,
      status: nextProps.status
    });
  }

  cardHandleClick = id => {
    this.props.history.push(`/dashboard/employees/${id}`);
  };

  render() {
    const { employees } = this.state;
    const { pageSize } = this.props;

    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <Pagination className="space-bottom" boundaryRange={1} defaultActivePage={1} firstItem={null} lastItem={null} siblingRange={1} totalPages={10} />
        {employees.map(item => (
          <>
            <EmployeeListItem employee={item} />
            <Divider />
          </>
        ))}
      </FlexColumn>
    );
  }
}

export default EmployeeList;
