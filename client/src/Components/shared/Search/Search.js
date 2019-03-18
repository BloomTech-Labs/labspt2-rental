import React, { Component } from "react";
import _ from "lodash";
import { Debounce } from "react-throttle";
import { Search } from "semantic-ui-react";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  handleSearchChange = (e, { value }) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <Debounce time="500" handler="onSearchChange">
        <Search
          style={{ flexGrow: 1, flexShrink: 0 }}
          input={{
            icon: "search",
            iconPosition: "left",
            className: "input-square",
            fluid: true
          }}
          onSearchChange={this.handleSearchChange}
          {...this.props}
        />
      </Debounce>
    );
  }
}
