import React, { Component } from "react";
import { List } from "semantic-ui-react";
import { FlexColumn } from "custom-components";
import IndividualTask from "./IndividualTask";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.tasks = [
      { id: 1, description: "Do something" },
      { id: 2, description: "Do something else" },
      { id: 3, description: "Again, do something else" }
    ];
  }

  render() {
    return (
      <FlexColumn>
        <List>
          {this.tasks.map(tasks => (
            <IndividualTask key={this.tasks.id} tasks={tasks} />
          ))}
        </List>
      </FlexColumn>
    );
  }
}
