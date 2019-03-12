import React from "react";
import "./topnav.css";

class TopNav extends React.Component {
  render() {
    return (
      <div className="top-nav">
        <div className="home-menu">
          <img src={require("./icons/menu.svg")} alt="" />
          <p>Home</p>
        </div>
        <div className="logo">
          <p>Logo Goes Here</p>
        </div>
        <div className="notify-help">
          <img
            src={require("./icons/notification-bell.svg")}
            alt="Notifications"
          />
          <img src={require("./icons/help-button.svg")} alt="Help" />
        </div>
      </div>
    );
  }
}

export default TopNav;
