import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
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

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700 }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>

                <Menu.Item position="right">
                  <Link to="/login">
                    <Button inverted={!fixed}>Log in</Button>
                  </Link>

                  <Link to="/register">
                    <Button
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>

            <HomePageHeader />

            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyTablet.minWidth}
              style={{ backgroundColor: "#f6f9fc", marginTop: "100px" }}
            >
              <Testimonials />
              <GetStarted />
            </Responsive>

            <Responsive
              getWidth={getWidth}
              minWidth={Responsive.onlyTablet.minWidth}
              style={{ backgroundColor: "#f6f9fc" }}
            >
              <Features />
            </Responsive>
          </Segment>
        </Visibility>
        {children}
        <Footer />
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

export default DesktopContainer;
