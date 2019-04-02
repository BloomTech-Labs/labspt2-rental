import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import { FlexColumn } from 'custom-components'
import IndividualTask from './IndividualTask'

export default class Task extends Component {
  constructor (props) {
    super (props);

    // this.state = {
    //   tasks: []
    // };

    this.tasks = [
      { id: 1, description: 'Do something' },
      { id: 2, description: 'Do something else' },
      { id: 3, description: 'Again, do something else' }
    ]

  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ 
  //     tasks: nextProps.tasks,
  //     status: nextProps.status
  //   });
  // }

  render () {
    // const { tasks } = this.state;

    return (
      <FlexColumn>
        <List>
          {this.tasks.map(tasks =>
            <IndividualTask key={this.tasks.id} tasks={tasks} />
          )}
        </List>
      </FlexColumn>
    )
  }
}



