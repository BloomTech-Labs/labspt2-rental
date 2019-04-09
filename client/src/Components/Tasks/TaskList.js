import React, { Component } from "react";
import { FlexColumn, Divider } from "custom-components";
import TaskListItem from "./TaskListItem";
import { Tab } from "semantic-ui-react";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        {this.props.tasks.map((task, ind) => (
          <>
            <TaskListItem task={task} key={ind} />
            <Divider />
          </>
        ))}
      </FlexColumn>
    );
  }
}

export default TaskList;
