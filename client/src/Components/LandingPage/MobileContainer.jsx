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

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        // as={Sidebar.Pushable}
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
          {/* Can add additional menu links here with Menu.Item; set active on currently chosen */}
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
              style={{ backgroundColor: "#f6f9fc" }}
            >
              <Testimonials mobile />
              <GetStarted mobile />
            </Responsive>

            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyMobile.minWidth}
              style={{ backgroundColor: "#f6f9fc", border: "1px solid green" }}
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
