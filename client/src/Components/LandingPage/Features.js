import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Header,
  Button,
  Icon,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { aroundTheWorld as WorldLogo } from "./svgs/around_the_world_undraw";
import { apartment as HouseLogo } from "./svgs/apartment_undraw";
import { mobileLogo as MobileLogo } from "./svgs/mobile_undraw";
import { payment as PaymentLogo } from "./svgs/payment_undraw";

export const Features = ({ mobile }) => (
  <Container>
    <Grid
      stackable
      style={{
        paddingTop: mobile ? "5em" : "7em",
        paddingBottom: mobile ? "3em" : 0
      }}
    >
      <Grid.Column width={4}>
        <WorldLogo mobile style={{ minWidth: "200px" }} />
      </Grid.Column>

      <Grid.Column
        width={10}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Header as="h2" content="Manage Your Properties from Anywhere" />
        <p style={{ color: "black", width: mobile ? "80%" : null }}>
          Whether your rental properties are next door or scattered across the
          United States, manage them from one simple dashboard. Assign Employees
          to specific locations, so no matter how far away you are, you're
          always in control.
        </p>
      </Grid.Column>
    </Grid>

    <Grid
      stackable
      style={{
        paddingTop: mobile ? "1em" : "4em",
        paddingBottom: mobile ? "3em" : 0,
        flexDirection: mobile ? "column-reverse" : null
      }}
    >
      <Grid.Column
        width={8}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Header as="h2" content="Customize Properties, Simplify Workflow" />
        <p style={{ color: "black", width: mobile ? "80%" : null }}>
          Each of your properties has unique needs. Creating a property is
          simple. Customizing the task lists for your employees to stay on
          target is limitless.
        </p>
      </Grid.Column>

      <Grid.Column width={6}>
        <HouseLogo style={{ minWidth: "200px" }} />
      </Grid.Column>
    </Grid>

    <Grid
      stackable
      style={{
        paddingTop: mobile ? "1em" : "4em",
        paddingBottom: mobile ? "3em" : 0
      }}
    >
      <Grid.Column width={6}>
        <MobileLogo style={{ minWidth: "200px" }} />
      </Grid.Column>

      <Grid.Column
        width={8}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Header as="h2" content="Your Dashboard, Your Devices" />
        <p style={{ color: "black", width: mobile ? "80%" : null }}>
          Roostr's dashboard is completely responsive. Whether you're working
          from your laptop, tablet or phone, everything is just a tap away. Your
          employees are on the go but always connected.
        </p>
      </Grid.Column>
    </Grid>

    <Grid
      stackable
      style={{
        paddingTop: mobile ? "1em" : "4em",
        paddingBottom: mobile ? "5em" : "4em",
        flexDirection: mobile ? "column-reverse" : null
      }}
    >
      <Grid.Column
        width={8}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Header as="h2" content="Secure Checkout with Stripe Payments" />
        <p style={{ color: "black", width: mobile ? "80%" : null }}>
          Your customers' security is our top priority. Roostr's checkout cart
          is setup with Stripe, so payment details are kept confidential and PCI
          compliant. We handle security so you can focus on what you do best.
        </p>
      </Grid.Column>

      <Grid.Column width={6}>
        <PaymentLogo style={{ minWidth: "200px" }} />
      </Grid.Column>
    </Grid>

    <Divider />

    <Container
      style={{
        marginTop: mobile ? "3em" : "5em",
        marginBottom: mobile ? "3em" : "3em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Header as="h1" content="Ready to Get Started?" />
      <Link to="/register">
        <Button
          animated
          primary
          size="huge"
          style={{ marginTop: "1.5em", marginBottom: mobile ? "3em" : "3em" }}
        >
          <Button.Content visible>Sign Up Today</Button.Content>
          <Button.Content hidden>
            <Icon name="right arrow" />
          </Button.Content>
        </Button>
      </Link>
    </Container>
  </Container>
);

Features.propTypes = {
  mobile: PropTypes.bool
};
