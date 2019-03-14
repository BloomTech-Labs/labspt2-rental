import React, { Component } from "react";
import Calendar from "react-calendar";
import FlexRow from "../../styled-components/index";

class DatePicker extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
  //need to come back and make this DRY.
  startDate = date => this.setState({ startDate: date });
  endDate = date => this.setState({ endDate: date });

  render() {
    return (
      <FlexRow>
        <Calendar onChange={this.startDate} value={this.state.startDate} />
        <Calendar onChange={this.endDate} value={this.state.startDate} />
      </FlexRow>
    );
  }
}

export default DatePicker;
