import React, { Component } from "react";
//import card component when finished
import DatePicker from "../../shared/DatePicker";

class PropertyList extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null
  };

  onDatesChange = ({ startDate, endDate }) => this.setState({ startDate, endDate })
  
  onFocusChange = focusedInput => this.setState({ focusedInput })

  render() {
    return (
      <DatePicker
        start={this.startDate}
        end={this.endDate}
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

export default PropertyList;
