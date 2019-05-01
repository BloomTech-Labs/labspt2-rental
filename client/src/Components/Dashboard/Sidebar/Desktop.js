import React, { Component } from "react";
import { Menu, Sidebar, Icon, Segment } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";

export class Desktop extends Component {
  state = {
    visible: true
  };

  render() {
    const { visible } = this.state;

    const logout = e => {
      localStorage.removeItem("authToken");
    };

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
            paddingTop: "3em"
          }}
        >
          <div>
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
            <Link to="/" onClick={logout}>
              <Icon inverted size="large" name="sign-out" />
              <p style={{ fontWeight: "bold", color: "white" }}>Logout</p>
            </Link>
          </FlexColumn>
        </Sidebar>

        <Sidebar.Pusher
          as={Segment}
          style={{
            marginLeft: "150px",
            minHeight: "calc(100vh - 20px)",
            marginTop: 0
          }}
        >
          <FlexRow width="full" justifyCenter>
            {this.props.pusher}
          </FlexRow>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
