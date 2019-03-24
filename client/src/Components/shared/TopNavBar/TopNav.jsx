import React, { Component } from "react";
import "./topnav.css";

class TopNav extends Component {
  requireSvg = name => require(`./icons/${name}.svg`);

  render() {
    return (
      <div className="top-nav">
        <div className="home-menu">
          <img src={this.requireSvg("menu")} alt="" />
          <p>Home</p>
        </div>
        <div className="logo">
          <p>Logo Goes Here</p>
        </div>
        <div className="notify-help">
          <img src={this.requireSvg("notification-bell")} alt="Notifications" />
          <img src={this.requireSvg("help-button")} alt="Help" />
        </div>
      </div>
    );
  }
}

export default TopNav;
