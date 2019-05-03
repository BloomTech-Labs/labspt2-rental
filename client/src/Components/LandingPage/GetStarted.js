import React from "react";
import PropTypes from "prop-types";
import { Container, Step, Icon, Header, Button } from "semantic-ui-react";
import { FlexColumn } from "../../custom-components/index";
import { Link } from "react-router-dom";

export const GetStarted = ({ mobile }) => (
  <FlexColumn
    alignCenter
    style={{
      width: "100%",
      height: mobile ? "105vh" : "100vh",
      backgroundColor: "#1a1b1c",
      display: "flex",
      paddingTop: mobile ? "10em" : "12em",
      paddingBottom: "15em"
    }}
  >
    <Header inverted as="h2" content="Get started in three simple steps:" style={{ marginBottom: mobile ? '2em' : null}}/>

    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: mobile ? "1em" : "4em",
        paddingBottom: mobile ? "5em" : "5em"
      }}
    >
      <Step.Group>
        <Step
          style={{ backgroundColor: "#1a1b1c", border: "1px solid #f6f9fc" }}
        >
          <Icon name="user outline" style={{ color: "#4ca34b" }} />
          <Step.Content>
            <Link to="/register">
              <Step.Title style={{ color: "#f6f9fc", fontWeight: "bold" }}>
                Sign Up
              </Step.Title>
              <Step.Description style={{ color: "#f6f9fc" }}>
                Create Your Account
              </Step.Description>
            </Link>
          </Step.Content>
        </Step>

        <Step
          style={{ backgroundColor: "#1a1b1c", border: "1px solid #f6f9fc" }}
        >
          <Icon name="home" style={{ color: "#4ca34b" }} />
          <Step.Content>
            <Step.Title style={{ color: "#f6f9fc", fontWeight: "bold" }}>
              Add Property
            </Step.Title>
            <Step.Description style={{ color: "#f6f9fc" }}>
              Enter Property Details
            </Step.Description>
          </Step.Content>
        </Step>

        <Step
          style={{ backgroundColor: "#1a1b1c", border: "1px solid #f6f9fc" }}
        >
          <Icon name="dollar" style={{ color: "#4ca34b" }} />
          <Step.Content>
            <Step.Title style={{ color: "#f6f9fc", fontWeight: "bold" }}>
              Book Guests
            </Step.Title>
            <Step.Description style={{ color: "#f6f9fc" }}>
              Collect Money!
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </Container>

    <Link
      to="/register"
      style={{
        marginTop: mobile ? "1em" : "2em",
        marginBottom: mobile ? "1em" : "2em"
      }}
    >
      <Button primary size="huge">
        Register Today
        <Icon name="right arrow" />
      </Button>
    </Link>
  </FlexColumn>
);

GetStarted.propTypes = {
  mobile: PropTypes.bool
};
