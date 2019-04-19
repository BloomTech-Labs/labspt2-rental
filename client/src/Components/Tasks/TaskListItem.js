import React, { Component } from 'react';
import { FlexRow, FlexColumn } from "custom-components";
import moment from "moment";
import { Checkbox, Label, Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Tasks from "./Tasks";
import { PROPERTY_STARTED } from "../Properties/actions";
import Properties from "../Properties/Properties";

class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  toggleComplete = () => {
    const { task } = this.props;
    window.alert(`toggle ${task._id}? completed: ${task.completed}`);
  }
  
  render() { 
    const { task } = this.props;

    return ( 
      <FlexRow
      alignCenter
      justifyBetween
      width="full"
      style={{ marginTop: "5px" }}
    >
      <FlexColumn>
        <FlexRow style={{ alignItems: "baseline" }}>
          <Checkbox 
            label={task.description} 
            onChange={this.toggleComplete}
          />
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
  }
}

export default TaskListItem;
