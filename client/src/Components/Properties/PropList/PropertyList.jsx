import React, { Component } from "react";
//import card component when finished
import DatePicker from "../../shared/DatePicker";

class PropertyList extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
  startDate = date => this.setState({ startDate: date });
  endDate = date => this.setState({ endDate: date });

  render() {
    return (
      <DatePicker
        start={this.startDate}
        end={this.endDate}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
      />
    );
  }
}

export default PropertyList;
