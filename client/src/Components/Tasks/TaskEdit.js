import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Header, Input, Dropdown, Button } from "semantic-ui-react";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // methods here
  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchProperties();
    this.props.fetchReservations();
    this.props.getTasks();
  }

  static getDerivedStateFromProps(props, state) {
    if (!state._id) {
      return props.tasks.tasks.find(t => t._id === props.match.params.id);
    }
    return null;
  }

  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ startDate: startDate, endDate: endDate });
  };

  handleCancel = () => {
    this.props.history.push('/dashboard/tasks/');
  };

  handleSubmit = () => {
    this.props
      .updateTask(this.state)
      .then(data => 
          this.props.history.push(`/dashboard/tasks/`)
      )
      .catch(err => []);
  };

  handleDelete = () => {
    window.alert("This task has been deleted.");
    this.props
      .deleteTask(this.props.match.params.id)
      .then(data => this.props.history.push(`/dashboard/tasks/`))
      .catch(err => {});
  };

  render() {
    const {
      tasks: { loading }
    } = this.props;
    
    return loading ? (
      "Loading"
    ) : (
      <>
        {this.state._id && (
      <FlexColumn>
        <FlexRow>
          <Header as="h1">Edit Task</Header>
        </FlexRow>

        <br />

        <FlexColumn style={{ width: "100%" }}>
          <FlexRow style={{ width: "100%" }}>
            <Input
              style={{ width: "100%" }}
              onChange={e => this.handleChange("description", e.target.value)}
              value={this.state.description}
            />
          </FlexRow>
        </FlexColumn>

        <br />

        <FlexRow width="full">
          <DateRangePickerWrapper
            onChange={this.handleDateChange}
            initialStartDate={
              new Date(this.state.startDate ? this.state.startDate : null)
            }
            initialEndDate={
              new Date(this.state.endDate ? this.state.endDate : null)
            }
          />
        </FlexRow>

        <br />
        <br />

        <FlexRow>
          <Dropdown
            placeholder="Property"
            style={{ marginRight: "10px" }}
            // value={ task ? task.property._id : null }
            value={this.state.property ? this.state.property._id : null}
            selection
            // onChange={(e, val) => this.handleChange("property", val.value)}
            onChange={(e, val) =>
              this.handleChange("property", {
                ...this.state.property,
                _id: val.value
              })
            }
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
            value={this.state.reservation ? this.state.reservation._id : null}
            onChange={(e, val) =>
              this.handleChange("reservation", {
                ...this.state.reservation,
                _id: val.value
              })
            }
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
            value={this.state.assignedTo ? this.state.assignedTo._id : null}
            onChange={(e, val) =>
              this.handleChange("assignedTo", {
                ...this.state.assignedTo,
                _id: val.value
              })
            }
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
        <Button 
            basic 
            color="red" 
            onClick={this.handleDelete}
          >
            Delete Task
          </Button>
          <Button 
            basic
            onClick={this.handleCancel}
          >
            Cancel Update
          </Button>
          <Button 
            color="blue" 
            onClick={this.handleSubmit}
          >
            Update Task
          </Button>
        </FlexRow>
      </FlexColumn>
      )}
      </>
    );
  }
}

export default TaskEdit;
