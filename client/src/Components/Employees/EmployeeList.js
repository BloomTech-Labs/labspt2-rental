import React, { Component } from "react";
// import { Route, Link, withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import { Reservations } from "../Reservations";
import Card from "../shared/Card/Card";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: true
    };
  }

  componentDidMount() {
    // here we'll grab the role and securities of the user
    this.setState({ owner: true });
  }

  // handleClick = ev => {
  //   this.setState({ active: ev.target.innerHTML });
  // };

  render() {
    return (
      <Container>
        <FlexRow>
          <div>Search Bar Goes here</div>
          {this.state.owner ? (
            <Button icon>
              <Icon name="plus circle" />
            </Button>
          ) : null}
        </FlexRow>
        {this.props.employees.map(employee => {
          // need to have a shared info card
          return <div>this is a card with the employee</div>;
        })}
      </Container>
    );
  }
}

export default EmployeeList;
