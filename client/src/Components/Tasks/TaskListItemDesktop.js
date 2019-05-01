import React from "react";
import { FlexRow, FlexColumn } from "custom-components";
import moment from "moment";
import { Checkbox, Label, Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TaskListItemDesktop = props => {
  const { task } = props;

  return (
    <FlexColumn style={{ padding: "10px, 0px, 10px, 0px" }}>
      <FlexRow style={{ alignItems: "baseline" }}>
        <Checkbox
          label={task.description}
          onChange={() => props.toggleComplete(task)}
          checked={task.completed}
        />
      </FlexRow>

      <FlexRow
        alignCenter
        justifyBetween
        width="full"
        style={{ marginTop: "5px", justifyContent: "space-between" }}
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
        <p style={{ paddingTop: "10px", paddingLeft: "25px" }}>
          <strong>Assignee: </strong>
          {task.assignedTo
            ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
            : "Not assigned"}
        </p>
        <p style={{ paddingTop: "5px" }}>
          Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
        </p>
        <Link to={`/dashboard/tasks/edit/${task._id}`}>
          <Button size="mini">Edit</Button>
        </Link>
      </FlexRow>
    </FlexColumn>

    // <FlexRow
    //   alignCenter
    //   justifyBetween
    //   width="full"
    //   style={{ marginTop: "5px", justifyContent: "space-between" }}
    // >
    //   <FlexColumn style={{ alignItems: "flex-start" }}>
    //     <FlexRow style={{ alignItems: "baseline" }}>
    //       <Checkbox
    //         label={task.description}
    //         onChange={() => props.toggleComplete(task)}
    //         checked={task.completed}
    //       />
    //       {/* <Link to={`/dashboard/tasks/edit/${task._id}`}>
    //         <Popup
    //           trigger={
    //             <Label
    //               size="mini"
    //               circular
    //               style={{ marginLeft: "5px", marginRight: "5px" }}
    //             >
    //               <Icon fitted name="info" />
    //             </Label>
    //           }
    //           content="Edit"
    //         />
    //       </Link> */}
    //     </FlexRow>
    //     <p style={{ paddingTop: "10px", paddingLeft: "25px" }}>
    //       <strong>Assignee: </strong>
    //       {task.assignedTo
    //         ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
    //         : "Not assigned"}
    //     </p>
    //   </FlexColumn>

    //   <FlexColumn style={{ alignItems: "flex-end" }}>
    //     <Popup
    //       trigger={
    //         <Label
    //           as="a"
    //           color="blue"
    //           content={
    //             task.property != null ? task.property.name : "Not assigned"
    //           }
    //           icon="home"
    //         />
    //       }
    //       content={
    //         task.property != null
    //           ? `${task.property.address1} ${task.property.city} ${
    //               task.property.state
    //             } ${task.property.zip}`
    //           : "Not assigned"
    //       }
    //     />
    //     <p style={{ paddingTop: "5px" }}>
    //       Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
    //     </p>
    //   </FlexColumn>
    // </FlexRow>
  );
};

export default TaskListItemDesktop;
