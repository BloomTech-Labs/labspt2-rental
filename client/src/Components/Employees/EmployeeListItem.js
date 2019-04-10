import React from "react";
import InfoCard from "../shared/Card/InfoCard";

const EmployeeListItem = props => {
  return (
    <InfoCard
      imageLoc={props.employee.imageLoc}
      header={`${props.employee.firstName} ${props.employee.lastName}`}
      lineOneTitle="Tasks Due Today"
      lineTwoTitle="OverDue Tasks"
      lineThreeTitle="Assigned Properties"
      lineOneInfo={props.employee.todayTask}
      lineTwoInfo={props.employee.overdue}
      lineThreeInfo={props.employee.properties}
      linkto={`/dashboard/employees/${props.employee._id}`}
    />
  );
};

export default EmployeeListItem;
