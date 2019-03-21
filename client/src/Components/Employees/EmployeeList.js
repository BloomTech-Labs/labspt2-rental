import React, { Component } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeSingle from "./EmployeeSingle";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: true,
      searchText: ""
    };
  }

  componentDidMount() {
    // here we'll grab the role and securities of the user
    this.props.getEmployees();
  }

  searchChangeHandler = e => {
    this.setState({ searchText: e.target.value });
  };

  cardHandleClick = id => {
    this.props.history.push(`/dashboard/employees/${id}`);
  };

  render() {
    return (
      <FlexColumn style={{ width: "full", maxWidth: "880px" }}>
        <FlexRow justifyBetween style={{ width: "90%" }}>
          <Input
            style={{ width: "80%" }}
            icon="address card"
            iconPosition="left"
            placeholder="Name, City, Property Name"
            onChange={this.searchChangeHandler}
          />
          {this.state.searchText ? (
            <Button basic attached="right">
              Clear
            </Button>
          ) : null}
          {this.state.owner ? (
            <Button icon>
              <Icon name="plus circle" />
            </Button>
          ) : null}
        </FlexRow>
        {console.log(this.props)}
        {this.props.loading ? (
          this.props.employees.map(employee => {
            return (
              <EmployeeListItem
                key={employee.userID}
                employee={employee}
                clickHandler={this.cardHandleClick}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </FlexColumn>
    );
  }
}

export default EmployeeList;
