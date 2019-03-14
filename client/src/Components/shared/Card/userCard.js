import React from "react";

const UserCard = props => {
  return (
    <div>
      <h2>{props.username}</h2>
      <h4>{props.email}</h4>
    </div>
  );
};

export default UserCard;
