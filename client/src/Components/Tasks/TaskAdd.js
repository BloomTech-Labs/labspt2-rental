import React, { Component } from 'react';
import { FlexColumn, FlexRow, Text } from 'custom-components';
import { Header, Input, Dropdown, Button, Segment } from 'semantic-ui-react';

class TaskAdd extends Component {
  constructor() {
    super();

    this.state = { 
      property: null,
      reservation: null,
      assistant: null,

    }
  }

  //methods here
  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchProperties();
    this.props.fetchReservations();
  };



  render() { 


    return ( 
      <FlexColumn>
        <FlexRow>
          <Header as="h1">Add Tasks</Header>
        </FlexRow>

        <br />

        <FlexColumn>

          <FlexRow>
            <Input
              placeholder="Add Task"
            />
          </FlexRow>

          {/* <br />

          <FlexRow width="100%" justifyCenter>
            <Button color='teal'>Add Task</Button>
          </FlexRow> */}

        </FlexColumn>

        <br />

        {/* <FlexRow width="full" justifyCenter>
          <Segment>       
            <FlexColumn width="full" justifyCenter> */}
              {/* map over tasks as they are created */}
              {/* <p>Task Item 1</p>
              <p>Task Item 2</p>
              <p>Task Item 3</p>
            </FlexColumn>
          </Segment>
        </FlexRow> */}

        <br />
        <br />
        {console.log(this.props)}

        <FlexRow>
          <Dropdown 
            placeholder="Property"
            style={{ marginRight: "10px" }}
            selection
            options={
              this.props.loading
                ? [{ text: "Loading...", value: "loading" }]
                : this.props.tasks.properties &&
                  this.props.tasks.properties.map(p => ({
                    key: p._id,
                    text: p.name,
                    value: p._id
                  }))
            }
          />
        </FlexRow>

        <br />

        <FlexRow>
          <Dropdown
            placeholder="Reservation"
            style={{ marginRight: "10px" }}
            selection
            options={
              this.props.loading
                ? [{ text: "Loading...", value: "loading" }]
                : this.props.tasks.reservations &&
                  this.props.tasks.reservations.map(r => ({
                    key: r._id,
                    text: r._id,
                    value: r._id
                  }))
            }
          />
        </FlexRow>

        <br />

        <FlexRow>
          <Dropdown
            placeholder="Employee"
            style={{ marginRight: "10px" }}
            selection
            options={
              this.props.loading
                ? [{ text: "Loading...", value: "loading" }]
                : this.props.properties.employees &&
                  this.props.properties.employees.map(e => ({
                    key: e._id,
                    text: e.firstName + " " + e.lastName,
                    value: e._id
                  }))
            }
          />
        </FlexRow>

        <br />

        <FlexRow width="full" justifyCenter>
          <Button color='green'>Submit Task List</Button>
        </FlexRow>

      </FlexColumn>
    );
  }
}

export default TaskAdd;