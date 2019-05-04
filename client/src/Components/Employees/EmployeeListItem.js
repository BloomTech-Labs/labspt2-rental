import React from "react";
import InfoCard from "../shared/Card/InfoCard";

const EmployeeListItem = props => {
  return (
    <InfoCard link={`/dashboard/employees/${props.employee._id}`}>
      <InfoCard.Image>{props.employee.image}</InfoCard.Image>
      <InfoCard.Title>{`${props.employee.firstName} ${
        props.employee.lastName
      }`}</InfoCard.Title>
      <InfoCard.Label hover="Assigned Properties">
        {props.employee.properties}
      </InfoCard.Label>
      <InfoCard.ID>{props.employee._id}</InfoCard.ID>
      <InfoCard.StatA label="Due Today">
        {props.employee.todayTask}
      </InfoCard.StatA>
      <InfoCard.StatB label="Overdue">{props.employee.overdue}</InfoCard.StatB>
    </InfoCard>
  );
};

export default EmployeeListItem;
