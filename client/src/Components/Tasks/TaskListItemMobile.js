import React from 'react';
import { FlexRow, FlexColumn } from "custom-components";
import moment from "moment";
import { Checkbox, Label, Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TaskListItemMobile = (props) => {

    const { task } = props;

    return ( 
      <FlexColumn style={{ width: "100%" }}>

        <FlexRow style={{ alignItems: "baseline"}}>
          <Checkbox 
            label={task.description} 
            onChange={() => props.toggleComplete(task)}
            checked={task.completed}
          />
          <Link to={`/dashboard/tasks/edit/${task._id}`}>
            <Popup
              trigger={
                <Label size="mini" circular style={{ marginLeft: "5px", marginRight: "5px" }}>
                  <Icon fitted name="info" />
                </Label>
              }
              content="Edit"
            />
          </Link>
        </FlexRow>

        <FlexRow>
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
            content={`${task.property.address1} ${
              task.property.city
            } ${task.property.state} ${task.property.zip}`}
          />
        </FlexRow>

        <FlexRow style={{ width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
          <p>
            <strong>Assignee: </strong>
            {task.assignedTo.firstName} {task.assignedTo.lastName}
          </p>
          <p>
            Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
          </p>
        </FlexRow>

      </FlexColumn>
    );
  }

export default TaskListItemMobile;
