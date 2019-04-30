import React, { Component } from "react";
import { Icon, Image, Header, Dropdown } from "semantic-ui-react";
import { FlexRow, Container, FlexColumn } from "custom-components";

import EmployeePropertyCard from "./EmployeePropertyCard";
import taskPropertyAssign from "./taskPropertyHelper";

const permissionValues = [
  {
    key: "yes",
    text: "Yes",
    value: true
  },
  {
    key: "no",
    text: "No",
    value: false
  }
];

class EmployeeSingle extends Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.query = {
      page: 1,
      pageSize: 10000,
      sort: "_id",
      search: ""
    };
  }

  componentDidMount() {
    if (!this.props.employees.length) {
      this.props.getEmployees({ ...this.query });
    }
  }

  removeEmplFromProperty = (e, id) => {
    // this removes an employee from a property's assigned employee list
    e.preventDefault();
    const property = this.props.properties.find(item => item._id === id);
    const { assistants } = property;
    const newAssistants = assistants.filter(
      item => item._id !== this.props.match.params.id
    );
    const newProperty = { _id: id, assistants: newAssistants };
    this.props
      .updateProperty(newProperty)
      .then(this.props.getEmployees({ ...this.query }));
  };

  permissionChange = body => {
    this.props.updateEmployee(this.props.match.params.id, body)
    .then(this.props.getEmployees({ ...this.query }));
  };

  // this is a reusable component for the permission selections with logic that removes the options if an employee is viewing it.
  PermissionDropdown = (options = {}) => {
    return options.user.role === "owner" ? (
      <Dropdown
        className="space-left-20"
        inline
        options={permissionValues}
        defaultValue={options.default}
        onChange={(e, val) =>
          this.permissionChange({
            ...options.employee,
            permissions: { ...options.employee.permissions, task: val.value }
          })
        }
      />
    ) : (
      <span className="space-left">{options.default ? "Yes" : "No"}</span>
    );
  };

  render() {
    const employees = taskPropertyAssign({
      employees: this.props.employees,
      tasks: this.props.tasks,
      properties: this.props.properties
    });
    let permissions;
    const id = this.props.match.params.id;
    const employee = employees.find(item => item._id === id);
    if (employee) {
      this.loading = false;
      permissions = employee.permissions;
    }
    const { user } = this.props;
    const propPermissions = user ? (user.role === "owner" || user.permissions.property ? true : false) : false;

    return (
      <Container>
        {this.loading ? (
          this.props.match.params.id === "add" ? null : (
            <div>Please wait...</div>
          )
        ) : (
          <FlexColumn justifyCenter alignStart width="full">
            <FlexRow justifyAround alignCenter width="full">
              <FlexColumn alignStart>
                <Header as="h1">
                  {" "}
                  {employee.firstName} {employee.lastName}{" "}
                </Header>
                <br />
                <br />
                <br />
                <Header as="h3"> Email: {employee.email} </Header>
                <Header as="h3"> Phone: {employee.phone} </Header>
                <br />
                <Header as="h3">
                  {`Today's Tasks: `}
                  {employee.todayTask}
                </Header>
                <Header as="h3">Overdue Tasks: {employee.overdue}</Header>
              </FlexColumn>
              {employee.image ? (
                <Image src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${employee.image}.jpg`} />
              ) : (
                <Icon
                  className="space-left-20"
                  name="user circle"
                  size="massive"
                />
              )}
            </FlexRow>

            <br />
            <br />

            <FlexRow justifyAround className="space-top-20" width="full">
              <FlexColumn width="40%">
                <Header as="h2">Employee Permissions</Header>
                <Header as="h3">
                  Can re-assign tasks
                  {this.PermissionDropdown({
                    default: permissions.task,
                    type: "task",
                    employee,
                    user
                  })}
                </Header>
                <Header as="h3">
                  Can re-assign properties
                  {this.PermissionDropdown({
                    default: permissions.property,
                    type: "property",
                    employee,
                    user
                  })}
                </Header>
                <Header as="h3">
                  Can bill guests
                  {this.PermissionDropdown({
                    default: permissions.checkout,
                    type: "checkout",
                    employee,
                    user
                  })}
                </Header>
              </FlexColumn>
              <FlexColumn alignCenter width="30%">
                <Header as="h2">Assigned Properties</Header>
                {typeof employee.assignedProp !== "undefined" &&
                employee.assignedProp.length ? (
                  employee.assignedProp.map(property => (
                    <EmployeePropertyCard
                      key={property._id}
                      property={property}
                      removeEmplFromProperty={this.removeEmplFromProperty}
                      propPermissions={propPermissions}
                    />
                  ))
                ) : (
                  <FlexColumn>
                    <div>No assigned properties</div>
                  </FlexColumn>
                )}
              </FlexColumn>
            </FlexRow>
          </FlexColumn>
        )}
      </Container>
    );
  }
}

export default EmployeeSingle;
