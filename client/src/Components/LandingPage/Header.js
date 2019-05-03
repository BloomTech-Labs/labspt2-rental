import PropTypes from "prop-types";
import React from "react";
import { Button, Container, Header, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexColumn, BouncingArrow } from "../../custom-components/index";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

export const HomePageHeader = ({ mobile }) => (
  <Container text>
    <FlexColumn alignCenter >

      <div style={{ 
        marginTop: mobile ? '3em' : '2em', 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight: mobile ? '14vh' : '20vh' 
        }}>

        <Image 
        src={`https://res.cloudinary.com/divjebnjg/image/upload/v1556828692/nashville-3340046_960_720.png`} 
        style={{ 
          width: '80%', 
          height: mobile ? '14vh' : '20vh' 
        }}
        />

      </div>

      <Header
        as="h1"
        content="Roostr"
        inverted
        style={{
          fontSize: mobile ? "3em" : "4em",
          fontWeight: "normal",
          marginBottom: mobile ? "1em" : 0,
          marginTop: mobile ? "1em" : "0.5em"
        }}
      />
      <Header
        as="h2"
        content="One app to manage your rental properties."
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? 0 : "1.5em",
          marginBottom: mobile ? "2.5em" : "1.5em"
        }}
      />
      <Link to="/register">
        <Button
          primary
          size="huge"
          style={{ marginBottom: mobile ? "2em" : 0 }}
        >
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    </FlexColumn>

    <BouncingArrow>
      <Icon
        size="large"
        name="down arrow"
        style={{
          marginTop: mobile ? "1em" : "3em",
          opacity: "0.8",
          marginBottom: mobile ? "1em" : null
        }}
      />
    </BouncingArrow>
  </Container>
);

HomePageHeader.propTypes = {
  mobile: PropTypes.bool
};
