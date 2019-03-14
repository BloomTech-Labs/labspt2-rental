import React, { Component } from "react";
import InfoCard from "../shared/Card/InfoCard";

const EmployeeListItem = props => {
  return (
    <InfoCard
      imageLoc={props.employee.imageLoc}
      header={props.employee.name}
      lineOneTitle="Tasks Due Today"
      lineTwoTitle="OverDue Tasks"
      lineThreeTitle="Assigned Properties"
      lineOneInfo={props.employee.todayTasks}
      lineTwoInfo={props.employee.overdueTasks}
      lineThreeInfo={props.employee.properties}
      singlePageHandler={() => props.clickHandler(props.employee.userID)}
    />
  );
};

export default EmployeeListItem;
