import React from 'react';
import { Grid, Header, Segment, Label, Button } from 'semantic-ui-react'
import Task from './Task'
import { FlexRow } from 'custom-components'

const TaskTitle = (props) => {
  return (
    <Grid style={{margin: "20px"}}>
      <Segment>
        <Header size='medium'>
          { props.tasklists.title }
        </Header>
        <Header size='small'>
          { props.tasklists.propertyName }
        </Header>
        <Task />

        <FlexRow style={{marginTop: "20px"}}>
          <Header color='orange'>
            Due Date:
          </Header>
          <Label color='violet' style={{marginLeft: "10px"}}>
            { props.tasklists.dueDate }
          </Label>
          <Button color='teal' size='mini' style={{marginLeft: "20px"}}>
            View All
          </Button>
        </FlexRow>
      </Segment>
    </Grid>
  )
}

export default TaskTitle