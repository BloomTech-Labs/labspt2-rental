import React from "react";
import { FlexRow } from "custom-components";
import moment from "moment";
import { Checkbox, Label, Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TaskListItemTablet = props => {
  const { task } = props;

  return (
    <FlexRow width="full" style={{ marginTop: "5px", flexDirection: "column" }}>
      <FlexRow>
        <Checkbox
          label={task.description}
          onChange={() => props.toggleComplete(task)}
          checked={task.completed}
        />
        <Link to={`/dashboard/tasks/edit/${task._id}`}>
          <Popup
            trigger={
              <Label
                size="mini"
                circular
                style={{ marginLeft: "5px", marginRight: "5px" }}
              >
                <Icon fitted name="info" />
              </Label>
            }
            content="Edit"
          />
        </Link>
      </FlexRow>

      <FlexRow
        width="full"
        style={{ alignItems: "baseline", justifyContent: "space-between" }}
      >
        <Popup
          trigger={
            <Label
              as="a"
              color="blue"
              content={
                task.property != null ? task.property.name : "Not assigned"
              }
              icon="home"
              style={{ marginTop: "10px" }}
            />
          }
          content={
            task.property != null
              ? `${task.property.address1} ${task.property.city} ${
                  task.property.state
                } ${task.property.zip}`
              : "Not assigned"
          }
        />
        <p>
          <strong>Assignee: </strong>
          {task.assignedTo
            ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
            : "Not assigned"}
        </p>
        <p>
          Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
        </p>
      </FlexRow>
    </FlexRow>
  );
};

export default TaskListItemTablet;
