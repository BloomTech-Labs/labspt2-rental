import React, { Component } from "react";
import { FlexColumn, Divider } from "custom-components";
import { Pagination, Responsive } from "semantic-ui-react";
import TaskListItemDesktop from "./TaskListItemDesktop";
import TaskListItemMobile from "./TaskListItemMobile";
// import TaskListItemTablet from "./TaskListItemTablet";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { handlePageChange, count, page, tasks } = this.props;

    return (
      <FlexColumn alignCenter style={{ position: "relative" }}>
        {!tasks ? (
          <h2>Loading...</h2>
        ) : (
          <Pagination
            className="space-bottom"
            onPageChange={handlePageChange}
            boundaryRange={0}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={count}
            activePage={page}
            ellipsisItem={null}
          />
        )}
        {this.props.tasks.map((task, index) => (
          <div style={{ width: "100%" }} key={index}>
            {/* <Responsive maxWidth={475}> */}
            <Responsive maxWidth={779}>
              <TaskListItemMobile
                task={task}
                // key={task._id}
                toggleComplete={this.props.toggleComplete}
              />
            </Responsive>
            {/* <Responsive minWidth={476} maxWidth={779}>
              <TaskListItemTablet
                task={task}
                key={task._id}
                toggleComplete={this.props.toggleComplete}
              />
            </Responsive> */}
            <Responsive minWidth={780}>
              <TaskListItemDesktop
                task={task}
                // key={task._id}
                toggleComplete={this.props.toggleComplete}
              />
            </Responsive>

            <Divider />
          </div>
        ))}
      </FlexColumn>
    );
  }
}

export default TaskList;
