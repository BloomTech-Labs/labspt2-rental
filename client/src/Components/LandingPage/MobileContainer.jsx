import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HomePageHeader } from "./Header";
import { Testimonials } from "./Testmonials";
import { Footer } from "./Footer";
import { GetStarted } from "./GetStarted";
import { Features } from "./Features";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button inverted>Log in</Button>
                  </Link>

                  <Link to="/register">
                    <Button inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Menu>
            </Container>
            <HomePageHeader mobile />

            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyMobile.minWidth}
              style={{ backgroundColor: "#f6f9fc", marginTop: "100px" }}
            >
              <Testimonials mobile />
              <GetStarted mobile />
            </Responsive>

            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyMobile.minWidth}
              style={{ backgroundColor: "#f6f9fc" }}
            >
              <Features mobile />
            </Responsive>
          </Segment>

          {children}
          <Footer mobile />
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

export default MobileContainer;
