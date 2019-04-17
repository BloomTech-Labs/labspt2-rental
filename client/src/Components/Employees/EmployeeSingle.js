import React, { Component } from "react";
// import { Route, Link, withRouter } from "react-router-dom";
import { Button, Icon, Image, Header, Dropdown } from "semantic-ui-react";
import { FlexRow, Container, FlexColumn } from "custom-components";

import taskPropertyAssign from "./taskPropertyHelper";

class EmployeeSingle extends Component {
  constructor(props) {
    super(props);
    this.loading = true;
  }

  componentDidMount() {
    if (!this.props.employees.length) {
      const query = {
        page: 1,
        pageSize: 10000,
        sort: "_id",
        search: ""
      };
      this.props.getEmployees({ ...query });
    }
  }

  permissionChange = body => {
    this.props.updateEmployee(this.props.match.params.id, body);
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

    return (
      <Container>
        {this.loading ? (
          <div>Please wait...</div>
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
              {employee.imageLoc ? (
                <Image src={employee.imageLoc} size="medium" />
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
                <Header as="h3">
                  Can re-assign tasks
                  <Dropdown
                    className="space-left-20"
                    inline
                    options={permissionValues}
                    defaultValue={permissions.task}
                    onChange={(e, val) =>
                      this.permissionChange({
                        ...employee,
                        permissions: { ...permissions, task: val.value }
                      })
                    }
                  />
                </Header>
                <Header as="h3">
                  Can re-assign properties
                  <Dropdown
                    className="space-left-20"
                    inline
                    options={permissionValues}
                    defaultValue={permissions.property}
                    onChange={(e, val) =>
                      this.permissionChange({
                        ...employee,
                        permissions: { ...permissions, property: val.value }
                      })
                    }
                  />
                </Header>
                <Header as="h3">
                  Can bill guests{"   "}
                  <Dropdown
                    className="space-left-20"
                    inline
                    options={permissionValues}
                    defaultValue={permissions.checkout}
                    onChange={(e, val) =>
                      this.permissionChange({
                        ...employee,
                        permissions: { ...permissions, checkout: val.value }
                      })
                    }
                  />
                </Header>
              </FlexColumn>
              <FlexColumn alignCenter width="30%">
                <Header as="h3">Assigned Properties</Header>
                {employee.properties ? (
                  employee.properties.map(property => (
                    <div>{property.name}</div>
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
