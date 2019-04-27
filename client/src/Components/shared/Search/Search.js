import React, { Component } from "react";
import { Debounce } from "react-throttle";
import { Search } from "semantic-ui-react";

export default class extends Component {
  handleSearchChange = (e, { value }) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <Debounce time="500" handler="onSearchChange">
        <Search
          showNoResults={false}
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
