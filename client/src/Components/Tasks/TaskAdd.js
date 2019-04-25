import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import {
  Header,
  Input,
  Dropdown,
  Button,
  Dimmer,
  Modal
} from "semantic-ui-react";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

class TaskAdd extends Component {
  constructor() {
    super();

    this.state = {
      description: null,
      property: null,
      startDate: null,
      endDate: null,
      reservation: null,
      assignedTo: null,
      status: "upcoming",
      dimmerOpen: false,
      modalOpen: false,
      modalMessage: ""
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

  errorClose = () => {
    this.setState({
      modalOpen: false
    });
  };
  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/dashboard/tasks");
  };
  handleSubmit = () => {
    const newTask = {
      description: this.state.description,
      property:
        this.state.property == null ? "Not assigned" : this.state.property,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      reservation:
        this.state.reservation == null
          ? "Not assigned"
          : this.state.reservation,
      assignedTo:
        this.state.assignedTo == null ? "Not assigned" : this.state.assignedTo,
      status: this.state.status
    };
    if (this.state.description && this.state.startDate && this.state.endDate) {
      this.props
        .createTask(newTask)
        .then(data => {
          if (data._id) {
            this.setState({
              dimmerOpen: true
            });
          } else {
            this.setState({
              modalOpen: true,
              modalMessage: "The task could not be added. Please try again."
            });
          }
        })
        .catch(err => {});
    } else {
      this.setState({
        modalOpen: true,
        modalMessage:
          "Description, start date, and end date are required. Please fill in required fields."
      });
    }
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
                    .filter(p => p.active === true)
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
            placeholder="Reservation"
            style={{ marginRight: "10px" }}
            selection
            onChange={(e, val) => this.handleChange("reservation", val.value)}
            options={
              this.props.loading
                ? [{ text: "Loading...", value: "loading" }]
                : this.state.property
                ? this.props.tasks.reservations &&
                  this.props.tasks.reservations
                    .filter(r => r.property._id === this.state.property)
                    .map(r => ({
                      key: r._id,
                      text: r._id,
                      value: r._id
                    }))
                : [{ text: "Choose Property First", value: "loading" }]
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
                : this.props.tasks.employees &&
                  this.props.tasks.employees.map(e => ({
                    key: e._id,
                    text: e.firstName + " " + e.lastName,
                    value: e._id
                  }))
            }
          />
        </FlexRow>

        <br />

        <FlexRow width="full">
          <DateRangePickerWrapper onChange={this.handleDateChange} />
        </FlexRow>

        <br />

        <FlexRow width="full" justifyCenter>
          <Button color="blue" onClick={this.handleSubmit}>
            Submit Task
          </Button>
        </FlexRow>
        <Dimmer
          size="fullscreen"
          active={this.state.dimmerOpen}
          page
          onClickOutside={this.successClose}
        >
          <Header as="h1" inverted>
            Task successfully added!
          </Header>
          <Header.Subheader>Click to return to the task list.</Header.Subheader>
        </Dimmer>
        <Modal open={this.state.modalOpen} size="small">
          <Modal.Content>
            <p>{this.state.modalMessage}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.errorClose} color="blue">
              Return to Form
            </Button>
          </Modal.Actions>
        </Modal>
      </FlexColumn>
    );
  }
}

export default TaskAdd;
