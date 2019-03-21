import React from 'react';
import { List, Checkbox } from 'semantic-ui-react'

const IndividualTask = (props) => {
  return (
    <List.Item>
      <Checkbox label={ props.tasks.description }></Checkbox>
    </List.Item>
  )
}

export default IndividualTask