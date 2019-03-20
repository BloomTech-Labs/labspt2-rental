import React, { Component } from "react";
import DatePicker from "../../shared/DatePicker/DatePicker.jsx";
import PropertyList from "./PropertyList";
import { FlexRow, FlexColumn } from "../../../custom-components/index";
import Search from "../../shared/Search/Search";

class Properties extends Component {
  render() {
    return (
      <FlexColumn>
        <FlexRow>
          <Search />
          <DatePicker />;
        </FlexRow>
        {/* <PropertyList /> */}
      </FlexColumn>
    );
  }
}

export default Properties;
