import React, { Component } from "react";
import { Menu, Sidebar, Button, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexColumn } from "custom-components";

export class Mobile extends Component {
  state = {
    visible: false
  };

  logout = e => {
    localStorage.removeItem("authToken");
  };

  render() {
    const { visible } = this.state;

    return (
      <Sidebar.Pushable style={{ width: "100%", minHeight: "100vh" }}>
        <Sidebar
          visible={visible}
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          width="thin"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "1em"
          }}
        >
          <div>
            <Menu.Item
              as="a"
              style={{ marginBottom: "2em" }}
              onClick={() => this.setState({ visible: false })}
            >
              <Icon name="close" />
              Hide Sidebar
            </Menu.Item>
            {this.props.links.map((link, ind) => (
              <Link key={ind} to={link.url} onClick={this.props.handleClick}>
                <Menu.Item>
                  <Icon name={link.icon} />
                  {link.name}
                </Menu.Item>
              </Link>
            ))}
          </div>

          <FlexColumn alignCenter justifyCenter>
            <Link to="/" onClick={this.logout}>
              <Icon inverted size="large" name="sign-out" />
              <p style={{ fontWeight: "bold", color: "white" }}>Logout</p>
            </Link>
          </FlexColumn>
        </Sidebar>

        <Sidebar.Pusher as={Segment} style={{ marginTop: 0 }}>
          <FlexColumn width="full" justifyCenter>
            <Button
              circular
              icon="bars"
              onClick={() => this.setState({ visible: !visible })}
              style={{ margin: "10px 0 0 10px" }}
            />
            {this.props.pusher}
          </FlexColumn>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
