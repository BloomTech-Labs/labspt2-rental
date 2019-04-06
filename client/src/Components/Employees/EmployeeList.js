import React from "react";
import { Pagination } from "semantic-ui-react";
import { FlexColumn, Divider } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";

const EmployeeList = props => {
  const { employees, tasks, properties, handlePageChange } = props;

  console.log(properties);

  if (tasks && properties) {
    const currentTime = Date.now();
    const newTasks = [];
    tasks.forEach(item => {
      const newTaskData = {};
      if (Date.parse(item.endDate) < currentTime) {
        newTaskData.overdue = true;
      } else if (Date.parse(item.startDate) < currentTime) {
        newTaskData.todayTask = true;
      }
      newTaskData.employee = item.assignedTo._id;
      newTasks.push(newTaskData);
    });
    employees.forEach(employee => {
      employee.overdue = 0;
      employee.todayTask = 0;
      employee.properties = 0;
      newTasks.forEach(task => {
        if (task.employee === employee._id) {
          if (task.overdue) {
            employee.overdue++;
          } else if (task.todayTask) {
            employee.todayTask++;
          }
        }
      });
      properties.forEach(property => {
        if (property.assistants.includes(employee._id)) {
          employee.properties++
        }
      })
    });
  }

  return (
    <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
      <Pagination
        onPageChange={handlePageChange}
        className="space-bottom"
        boundaryRange={1}
        // defaultActivePage={1}
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
};

export default EmployeeList;
