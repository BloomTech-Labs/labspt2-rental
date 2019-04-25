import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Header, Input, Dropdown, Button, Dimmer } from "semantic-ui-react";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

class TaskAdd extends Component {
  constructor() {
    super();

    this.state = {
      description: null,
      property: null,
      startDate: null,
      endDate: null,
      assignedTo: null,
      status: "upcoming",
      dimmerOpen: false
    };
  }

  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchProperties();
    this.props.fetchReservations();
  }

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ startDate: startDate, endDate: endDate });
  };

  handleSubmit = () => {
    const newTask = {
      description: this.state.description,
      property:
        this.state.property == null ? "Not assigned" : this.state.property,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      assignedTo:
        this.state.assignedTo == null ? "Not assigned" : this.state.assignedTo,
      status: this.state.status
    };
    this.props
      .createTask(newTask)
      .then(data => {
        if (data._id) {
          this.props.history.push("/dashboard/tasks");
        }
      })
      .catch(err => {});
  };

  render() {
    return (
      <FlexColumn>
        <FlexRow>
          <Header as="h1">Add Tasks</Header>
        </FlexRow>

        <br />

        <FlexColumn style={{ width: "100%" }}>
          <FlexRow style={{ width: "100%" }}>
            <Input
              style={{ width: "100%" }}
              placeholder="Add Task"
              onChange={e => this.handleChange("description", e.target.value)}
            />
          </FlexRow>
        </FlexColumn>

        <br />

        <FlexRow width="full">
          <DateRangePickerWrapper onChange={this.handleDateChange} />
        </FlexRow>

        <br />
        <br />

        <FlexRow>
          <Dropdown
            placeholder="Property"
            style={{ marginRight: "10px" }}
            selection
            onChange={(e, val) => this.handleChange("property", val.value)}
            options={
              this.props.loading
                ? [{ text: "Loading...", value: "loading" }]
                : this.props.tasks.properties &&
                  this.props.tasks.properties
                    .filter(property => property.active === true)
                    .map(p => ({
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
            placeholder="Employee"
            style={{ marginRight: "10px" }}
            selection
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
          <Button color="blue" onClick={this.handleSubmit}>
            Submit Task
          </Button>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default TaskAdd;
