import React, { Component } from "react";
import UserCard from "../shared/Card/userCard";

class UserList extends Component {
  render() {
    return this.props.users.map(user => {
      return <UserCard username={user.username} email={user.email} />;
    });
  }
}

export default UserList;
