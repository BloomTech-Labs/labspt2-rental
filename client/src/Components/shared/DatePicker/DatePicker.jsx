import React, { Component } from "react";
import PropTypes from "prop-types";
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import omit from "lodash/omit";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { DateRangePickerPhrases } from "react-dates/src/defaultPhrases";
import DateRangePickerShape from "react-dates/src/shapes/DateRangePickerShape";
import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT
} from "react-dates/constants";
import isInclusivelyAfterDay from "react-dates/src/utils/isInclusivelyAfterDay";

const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  stateDateWrapper: PropTypes.func,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,

  ...omit(DateRangePickerShape, [
    "startDate",
    "endDate",
    "onDatesChange",
    "focusedInput",
    "onFocusChange"
  ])
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: "Start Date",
  endDateId: END_DATE,
  endDatePlaceholderText: "End Date",
  disabled: false,
  required: false,
  screenReaderInputMessage: "",
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat("L"),
  monthFormat: "MMMM YYYY",
  phrases: DateRangePickerPhrases,

  stateDateWrapper: date => date
};

class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    const inStartDate = props.initialStartDate,
      inEndDate = props.initialEndDate;

    this.state = {
      focusedInput,
      startDate:
        inStartDate && inStartDate instanceof Date
          ? moment(inStartDate)
          : inStartDate
          ? inStartDate
          : null,
      endDate:
        inEndDate && inEndDate instanceof Date
          ? moment(inEndDate)
          : inEndDate
          ? inEndDate
          : null
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const { stateDateWrapper, onChange } = this.props;

    if (onChange) {
      onChange({
        startDate: startDate ? startDate.toDate() : null,
        endDate: endDate ? endDate.toDate() : null
      });
    }

    this.setState({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate)
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <DateRangePicker
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        focusedInput={focusedInput}
        endDateId="end date"
        startDateId="start date"
        startDate={startDate}
        endDate={endDate}
        showClearDates
      />
    );
  }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
