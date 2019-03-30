import React, { Component } from "react";
import {
  Select,
  Header,
  Input,
  Button,
  Label,
  Statistic,
  Popup,
  Icon
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Text } from "custom-components";
import DateRangePickerWrapper from "../shared/DatePicker/DatePicker";
import moment from "./ReservationListItem";

class ReservationAdd extends Component {
  componentDidMount() {
    this.props.fetchProperties();
    this.props.fetchEmployees();
  }

  componentDidUpdate() {
    console.log("asdfsdfsdf", this.props);
  }

  render() {
    return (
      <FlexColumn justifyBetween width="full">
        <Header as="h1">Add New Reservation</Header>
        <FlexRow>
          <Select
            placeholder="Property"
            options={this.props.properties.map(p => ({
              key: p._id,
              text: p.name,
              value: p._id
            }))}
          />

          <DateRangePickerWrapper />
        </FlexRow>

        <FlexRow>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
        </FlexRow>

        <FlexRow>
          <Input placeholder="Phone Number" />
        </FlexRow>

        <FlexRow alignCenter>
          <Button circular icon="minus" />
          <Statistic size="tiny" style={{ margin: "0 15px" }}>
            <Statistic.Label>Guests</Statistic.Label>
            <Statistic.Value>1</Statistic.Value>
          </Statistic>
          <Button circular icon="plus" />
        </FlexRow>

        <FlexRow>
          <Select
            placeholder="Select your country"
            options={this.props.employees.map(e => ({
              key: e._id,
              text: e.firstName + " " + e.lastName,
              value: e._id
            }))}
          />
        </FlexRow>

        <Button color="green">Create Reservation</Button>
      </FlexColumn>
    );
  }
}

export default ReservationAdd;
