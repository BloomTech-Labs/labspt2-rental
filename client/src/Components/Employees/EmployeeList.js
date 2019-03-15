import React, { Component } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import EmployeeListItem from "./EmployeeListItem";

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
    this.setState({ owner: true });
  }

  searchChangeHandler = e => {
    console.log(this.state.searchText);
    this.setState({ searchText: e.target.value });
  };

  cardHandleClick = id => {
    this.props.history.push(`/dashboard/employees/${id}`);
  };

  render() {
    return (
      <Container>
        <FlexRow>
          <Input
            fluid
            icon="address card"
            iconPosition="left"
            placeholder="Name, City, Property Name"
            onChange={this.searchChangeHandler}
          />
          {this.state.owner ? (
            <Button icon>
              <Icon name="plus circle" />
            </Button>
          ) : null}
        </FlexRow>
        {this.props.employees.map(employee => {
          // need to have a shared info card
          return (
            <EmployeeListItem
              key={employee.userID}
              employee={employee}
              clickHandler={this.cardHandleClick}
            />
          );
        })}
      </Container>
    );
  }
}

export default EmployeeList;
