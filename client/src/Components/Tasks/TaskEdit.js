import React, { Component } from "react";
import { FlexColumn, FlexRow, Text } from "custom-components";
import { Header, Input, Dropdown, Button, Segment } from "semantic-ui-react";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props.match.params.id
    };
  }

  // methods here
  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchProperties();
    this.props.fetchReservations();
    this.props.getTasks();
  }

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
    console.log(prop);
  };

  handleDateChange = ({ prop, val }) => {
    this.setState({ [prop]: val});
    console.log(prop);
  };

  handleSubmit = () => {
    console.log(this.props);
    this.props
      .updateTask(this.state)
      .then(data => 
          this.props.history.push(`/dashboard/tasks/${this.state._id}`)
      )
      .catch(err => {});
  };

  render() {
    const {
      tasks: { tasks }
    } = this.props;
    
    const task = tasks.find(t => t._id === this.props.match.params.id);

    return (
      <FlexColumn>
        <FlexRow>
          <Header as="h1">Edit Task</Header>
        </FlexRow>

        <br />

        <FlexColumn style={{ width: "100%" }}>
          <FlexRow style={{ width: "100%" }}>
            <Input
              style={{ width: "100%" }}
              placeholder="Add Task"
              onChange={(e, val) => this.handleChange("description", val)}
              value={ task ? task.description : null }
            />
          </FlexRow>

        </FlexColumn>

        <br />

        <FlexRow width="full">
          <DateRangePickerWrapper 
            onChange={this.handleDateChange}
            initialStartDate={new Date(task ? task.startDate : null) }
            initialEndDate={new Date(task ? task.endDate : null) }
          />
        </FlexRow>

        <br />
        <br />

        <FlexRow>
          <Dropdown
            placeholder="Property"
            style={{ marginRight: "10px" }}
            value={ task ? task.property._id : null }
            selection
            onChange={(e, val) => this.handleChange("property", val.value)}
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
            value={ task ? task.reservation._id : null }
            onChange={(e, val) => this.handleChange("reservation", val.value)}
            options={
              this.props.loading
                ? [{ text: "Loading...", value: "loading" }]
                : this.props.tasks.employees &&
                  this.props.tasks.employees.map(r => ({
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
            value={ task ? task.assignedTo._id : null }
            onChange={(e, val) => this.handleChange("assignedTo", val.value)}
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
          <Button color="green" onClick={this.handleSubmit}>
            Update Task
          </Button>
          <Button color="red">
            Delete Task
          </Button>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default TaskEdit;