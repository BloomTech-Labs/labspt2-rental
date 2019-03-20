import React from 'react'
import { Segment, Header, Icon, Checkbox } from 'semantic-ui-react'
import { FlexRow, FlexColumn } from 'custom-components'

const TaskPageTop = () => {
  return (
    <div>
      <FlexRow>
        <Segment style={{width: "75%"}}>
          <FlexColumn>
            <div style={{display: "flex", flexDirection: "row", alignItems: "baseline"}}>
              <Icon name='clipboard list icon' size='big'/>
              <Header size='medium'>Assistant, Property Name</Header>
            </div>
          </FlexColumn>
        </Segment>
        <FlexColumn style={{marginLeft: "20px"}}>
          <Checkbox label='Due Today' style={{padding: "5px"}}/>
          <Checkbox label='Overdue Tasks' style={{padding: "5px"}}/>
        </FlexColumn> 
      </FlexRow>
    </div>
  )
}

export default TaskPageTop