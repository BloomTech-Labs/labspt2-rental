import React, { Component } from "react";
import { string, shape, arrayOf } from "prop-types";

class SecuredComponent extends Component {
  static propTypes = {
    permission: string.isRequired,
    user: shape().isRequired, // don't do `shape()` in prod code.
    children: arrayOf(shape()).isRequired // it's better than nothing though
  };

  state = {
    authorized: false
  };

  componentDidMount() {
    const { permission, user } = this.props;
    if (user.permissions[permission]) {
      this.setState({ authorized: true });
    } else this.setState({ authorized: false });
  }

  render() {
    const { authorized } = this.state;
    if (authorized) return this.props.children;
    else return null;
  }
}

export default SecuredComponent;
