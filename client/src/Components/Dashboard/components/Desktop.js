import React, { Component } from "react";
import { Menu, Sidebar, Button, Icon, Segment } from "semantic-ui-react";
import { FlexRow } from "custom-components";
import { Link } from "react-router-dom";

export class Desktop extends Component {
  state = {
    visible: true
  };

  render() {
    const { visible } = this.state;

    return (
      <Sidebar.Pushable style={{ width: "100%" }}>
        <Sidebar
          visible={visible}
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          width="thin"
        >
          {this.props.links.map((link, ind) => (
            <Link key={ind} to={link.url} onClick={this.props.handleClick}>
              <Menu.Item as="a">
                <Icon name={link.icon} />
                {link.name}
              </Menu.Item>
            </Link>
          ))}
        </Sidebar>

        <Sidebar.Pusher as={Segment} style={{ marginLeft: "130px" }}>
          {/*style={{ marginLeft: visible && "140px" }}*/}
          <FlexRow width="full" justifyCenter>
            {this.props.pusher}
          </FlexRow>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
