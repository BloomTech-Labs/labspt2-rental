import React, { Component } from "react";
// import { Route, Link, withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";
import Card from "../shared/Card/Card";

const EmployeeSingle = props => {

    return (
      <Container>
        <div>{this.props.employee}</div>
      </Container>
    );
  }


export default EmployeeSingle;
