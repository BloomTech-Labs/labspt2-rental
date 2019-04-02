import React, { Component } from 'react';
import { FlexColumn } from "custom-components";
import TaskListItem from "./TaskListItem";
import { Tab } from 'semantic-ui-react';

class TaskList extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      tasks: []
    };
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.setState({
      tasks: nextProps.tasks,
      status: nextProps.status
    });
  }

  render() { 
    const { tasks } = this.state;

    return ( 
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        {tasks.map((task, ind) => (
          <>
            <TaskListItem task={task} />
          </>
        ))}
      </FlexColumn>
    );
  }
}

export default TaskList;






// import React, { Component } from 'react'
// import { Segment } from 'semantic-ui-react'
// import TaskTitle from './TaskTitle'

// export default class TaskList extends Component {
//   constructor (props) {
//     super (props)

    
//     this.taskList = [
//       {
//         id: 1,
//         title: 'Task list for San Diego',
//         propertyName: 'Property 1',
//         dueDate: '3/21'
//       },
//       {
//         id: 2,
//         title: 'Task list for Moab',
//         propertyName: 'Property 2',
//         dueDate: '4/15'
//       },
//       {
//         id: 3,
//         title: 'Task list for Island Park Property ',
//         propertyName: 'Property 3',
//         dueDate: '12/21'
//       },
//       {
//         id: 4,
//         title: 'Taks list for East Coast Property',
//         propertyName: 'Property 4',
//         dueDate: '6/30'
//       }
//     ]

//   }
  
//   render () {
//     return ( 
//         <Segment style={{display: "flex", flexDirction: "row", flexWrap: "wrap"}}>
//         {this.taskList.map(tasklists =>
//           <TaskTitle key={this.taskList.id} tasklists={tasklists}/>
//         )}
//         </Segment>
//     )
//   }
// }
