import React, { Component } from "react";
import { FlexColumn, Divider } from "custom-components";
import TaskListItem from "./TaskListItem";
import { Tab, Pagination, Label } from "semantic-ui-react";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { loading, tasks, handlePageChange, count, page } = this.props;

    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <Pagination
          className="space-bottom"
          onPageChange={handlePageChange}
          boundaryRange={1}
          firstItem={null}
          lastItem={null}
          ellipsisItem={true}
          siblingRange={1}
          totalPages={count}
          showEllipsis={true}
          activePage={page}
        />

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
