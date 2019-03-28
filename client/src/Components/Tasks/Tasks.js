import React, { Component } from 'react'
import TaskList from './TaskList'
import TaskPageTop from './TaskPageTop'

export default class Tasks extends Component {
  
  render () {
    return (
      <div>
        <TaskPageTop />
        <TaskList 
          style={{margin: "20px"}}
        />
      </div>
    )
  }
}