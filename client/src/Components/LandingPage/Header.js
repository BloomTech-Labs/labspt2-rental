import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Container,
  Header,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

export const HomePageHeader = ({ mobile }) => (
    <Container text>
      <Header
        as="h1"
        content="Roostr"
        inverted
        style={{
          fontSize: mobile ? "3em" : "4em",
          fontWeight: "normal",
          marginBottom: mobile ? "0.5em" : 0,
          marginTop: mobile ? "2em" : "3em"
        }}
      />
      <Header
        as="h2"
        content="One app to manage your properties."
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em",
          marginBottom: mobile ? "1.5em" : "1.5em"
        }}
      />
      <Link to="/register">
        <Button primary size="huge" style={{marginBottom: mobile ? "4em" : 0}}>
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    </Container>
  );
  
  HomePageHeader.propTypes = {
    mobile: PropTypes.bool
  };