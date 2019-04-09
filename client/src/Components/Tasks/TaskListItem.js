import React from "react";
import { FlexRow, FlexColumn } from "custom-components";
import moment from "moment";
import { Checkbox, Label } from 'semantic-ui-react';
import Tasks from "./Tasks";

const TaskListItem = ({ task }) => {
  return (
    <FlexRow alignCenter justifyBetween width="full" style={{marginTop: "5px"}}>
      <FlexColumn>
        <Checkbox label={task.description} />
        <p style={{ paddingTop: "10px", paddingLeft: "25px" }}>
          <strong>Assignee: </strong>{task.assignedTo.firstName} {task.assignedTo.lastName}
        </p>
      </FlexColumn>
      <FlexColumn style={{alignItems: "flex-end"}}>
        <Label color='purple'>{task.property.name}</Label>
        <p style={{ paddingTop: "5px" }}>
          Due: {moment(task.endDate).format("MM/DD")}
        </p>
      </FlexColumn>
    </FlexRow>
  )
}

export default TaskListItem;