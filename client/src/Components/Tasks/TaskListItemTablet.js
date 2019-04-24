import React from "react";
import { FlexRow, FlexColumn } from "custom-components";
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
              content={task.property.name}
              icon="home"
              style={{ marginTop: "10px" }}
            />
          }
          content={`${task.property.address1} ${task.property.city} ${
            task.property.state
          } ${task.property.zip}`}
        />
        <p>
          <strong>Assignee: </strong>
          {task.assignedTo.firstName} {task.assignedTo.lastName}
        </p>
        <p>
          Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
        </p>
      </FlexRow>
    </FlexRow>
  );
};

export default TaskListItemTablet;
