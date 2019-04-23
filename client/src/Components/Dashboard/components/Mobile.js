import React, { Component } from "react";
import { Menu, Sidebar, Button, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexRow } from "custom-components";

export class Mobile extends Component {
  state = {
    visible: false
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
        >
          <Menu.Item as="a" onClick={() => this.setState({ visible: false })}>
            <Icon name="close" />
            Hide Sidebar
          </Menu.Item>
          {this.props.links.map((link, ind) => (
            <Link key={ind} to={link.url} onClick={this.props.handleClick}>
              <Menu.Item as="a">
                <Icon name={link.icon} />
                {link.name}
              </Menu.Item>
            </Link>
          ))}
        </Sidebar>

        <Button
          circular
          icon="bars"
          onClick={() => this.setState({ visible: !visible })}
          style={{ margin: "10px 0 0 10px" }}
        />

        <Sidebar.Pusher as={Segment}>
          {/*style={{ marginLeft: visible && "140px" }}*/}
          <FlexRow width="full" justifyCenter>
            {this.props.pusher}
          </FlexRow>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
