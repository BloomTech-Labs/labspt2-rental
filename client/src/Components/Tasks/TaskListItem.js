import React from "react";
import { FlexRow, FlexColumn } from "custom-components";
import moment from "moment";
import { Checkbox, Label, Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Tasks from "./Tasks";

const TaskListItem = ({ task }) => {
  return (
    <FlexRow
      alignCenter
      justifyBetween
      width="full"
      style={{ marginTop: "5px" }}
    >
      <FlexColumn>
        <FlexRow style={{ alignItems: "baseline" }}>
          <Checkbox label={task.description} />
          <Link to={`/dashboard/tasks/edit/${task._id}`}>
            <Popup
              trigger={
                <Label size="mini" circular style={{ marginLeft: "5px" }}>
                  <Icon fitted name="info" />
                </Label>
              }
              content="Edit"
            />
          </Link>
        </FlexRow>
        <p style={{ paddingTop: "10px", paddingLeft: "25px" }}>
          <strong>Assignee: </strong>
          {task.assignedTo.firstName} {task.assignedTo.lastName}
        </p>
      </FlexColumn>

      <FlexColumn style={{ alignItems: "flex-end"}}>
        <Popup 
          trigger={
            <Label 
              as="a"
              color="blue"
              content={task.property.name}
              icon="home"
            />
          }
          content={`${task.property.address1} ${
            task.property.city
          } ${task.property.state} ${task.property.zip}`}
        />
        <p style={{ paddingTop: "5px" }}>
          Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
        </p>
      </FlexColumn>
    </FlexRow>
  );
};

export default TaskListItem;
