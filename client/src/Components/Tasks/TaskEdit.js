import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import {
  Header,
  Input,
  Dropdown,
  Button,
  Modal,
  Label
} from "semantic-ui-react";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";

class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  // methods here
  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchProperties();
    this.props.fetchReservations();
    this.props.getTasks();
    this.props.fetchUserLog();
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
    this.props.history.push("/dashboard/tasks/");
  };

  handleSubmit = () => {
    this.props
      .updateTask(this.state)
      .then(data => this.props.history.push(`/dashboard/tasks/`))
      .catch(err => []);
  };

  handleDelete = () => {
    this.props
      .deleteTask(this.props.match.params.id)
      .then(data => this.props.history.push(`/dashboard/tasks/`))
      .catch(err => {});
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  errorClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      tasks: { loading, user }
    } = this.props;
    const role = user ? user.role : null;
    const permissions = user ? user.permissions : null;

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
                  onChange={e =>
                    this.handleChange("description", e.target.value)
                  }
                  value={this.state.description}
                />
              </FlexRow>
            </FlexColumn>

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
                value={
                  this.state.reservation ? this.state.reservation._id : null
                }
                onChange={(e, val) =>
                  this.handleChange("reservation", {
                    ...this.state.reservation,
                    _id: val.value
                  })
                }
                options={
                  this.props.loading
                    ? [{ text: "Loading...", value: "loading" }]
                    : this.state.property
                    ? this.props.tasks.reservations
                        .filter(r => r.property._id === this.state.property._id)
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

            {role === "employee" && permissions.task === false ? (
              <FlexColumn>
                <Dropdown
                  disabled
                  placeholder="Employee"
                  style={{ marginRight: "10px" }}
                  selection
                  value={
                    this.state.assignedTo ? this.state.assignedTo._id : null
                  }
                  onChange={(e, val) =>
                    this.handleChange("assignedTo", {
                      ...this.state.assignedTo,
                      _id: val.value
                    })
                  }
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
                <Label basic color="grey" pointing>
                  You need permissions to reassign tasks!
                </Label>
              </FlexColumn>
            ) : (
              <FlexRow>
                <Dropdown
                  placeholder="Employee"
                  style={{ marginRight: "10px" }}
                  selection
                  value={
                    this.state.assignedTo ? this.state.assignedTo._id : null
                  }
                  onChange={(e, val) =>
                    this.handleChange("assignedTo", {
                      ...this.state.assignedTo,
                      _id: val.value
                    })
                  }
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
            )}

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

            <FlexRow width="full" justifyCenter>
              {role === "employee" && permissions.task === false ? null : (
                <Button basic color="red" onClick={this.openModal}>
                  Delete Task
                </Button>
              )}
              <Button basic onClick={this.handleCancel}>
                Cancel Update
              </Button>
              <Button color="blue" onClick={this.handleSubmit}>
                Update Task
              </Button>
            </FlexRow>

            <Modal open={this.state.modalOpen} size="small">
              <Modal.Content>
                <p>Are you sure you want to delete this task?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color="red" onClick={this.errorClose}>
                  No, do not delete!
                </Button>
                <Button color="blue" onClick={this.handleDelete}>
                  Yes, delete!
                </Button>
              </Modal.Actions>
            </Modal>
          </FlexColumn>
        )}
      </>
    );
  }
}

export default TaskEdit;
