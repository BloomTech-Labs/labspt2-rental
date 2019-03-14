import React from "react";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const DatePicker = props => {
  return (
    <DateRangePicker
      startDate={props.startDate}
      startDateId={props.startDate}
      endDate={props.endDate}
      endDateId={props.endDate}
      onDatesChange={props.onDatesChange}
      focusedInput={props.focusedInput}
      onFocusChange={props.onFocusChange}
    />
  );
};

export default DatePicker;
