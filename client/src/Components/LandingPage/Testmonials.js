import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexColumn, FlexRow } from "../../custom-components/index";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

export const Testimonials = ({ mobile }) => (
  <Container
    style={{
      width: "100%",
      border: "1px solid #f6f9fc",
      marginTop: mobile ? "3em" : "14em",
      marginBottom: mobile ? "3em" : "4em",
      paddingBottom: mobile ? "2em" : "3em",
      paddingTop: mobile ? null : "4em"
    }}
    text
  >
    <Header
      as="h2"
      content="Our customers love Roostr"
      style={{
        fontSize: mobile ? "2.5em" : "3em",
        fontWeight: "bold",
        marginTop: mobile ? "2em" : "1em",
        marginBottom: mobile ? "1em" : "1em"
      }}
    />

    {mobile ? <MobileTestimonials /> : <DesktopTestimonials />}

    <Link to="/register">
      <Button primary size="huge">
        Try Roostr For Free
        <Icon name="right arrow" />
      </Button>
    </Link>
  </Container>
);

Testimonials.propTypes = {
  mobile: PropTypes.bool
};

const MobileTestimonials = () => (
  <Grid
    style={{
      marginLeft: "1em",
      marginBottom: "3em",
      marginTop: "1em"
    }}
  >
    <Grid.Column width={16}>
      <FlexRow style={{ marginBottom: "3em", minWidth: "16em" }}>
        <Grid.Column>
          <Image src="https://joeschmoe.io/api/v1/joe" fluid />
        </Grid.Column>

        <Grid.Column
          style={{
            display: "flex",
            justifyContent: "center",
            width: "90%",
            minHeight: "15vh"
          }}
        >
          <FlexColumn alignCenter justifyCenter>
            <p style={{ color: "black", fontWeight: "bold" }}>
              "Roostr saves me time and energy."
            </p>
            <p style={{ color: "black" }}> - Joe, Seattle</p>
          </FlexColumn>
        </Grid.Column>
      </FlexRow>
    </Grid.Column>

    <Grid.Column width={16}>
      <FlexRow style={{ marginBottom: "2em" }}>
        <Grid.Column>
          <Image src="https://joeschmoe.io/api/v1/jess" fluid />
        </Grid.Column>

        <Grid.Column
          style={{
            display: "flex",
            justifyContent: "center",
            width: "90%",
            minHeight: "15vh"
          }}
        >
          <FlexColumn alignCenter justifyCenter>
            <p style={{ color: "black", fontWeight: "bold" }}>
              "Simple to use, from my office to on the go."
            </p>
            <p style={{ color: "black" }}> - Jess, Boston</p>
          </FlexColumn>
        </Grid.Column>
      </FlexRow>
    </Grid.Column>
  </Grid>
);

const DesktopTestimonials = () => (
  <Grid
    columns={2}
    divided
    style={{
      marginLeft: "1em",
      marginRight: "1em",
      marginBottom: "4em"
    }}
  >
    <Grid.Row>
      <Grid.Column style={{ marginTop: "2em", minWidth: "20em" }}>
        <FlexRow>
          <Image src="https://joeschmoe.io/api/v1/joe" fluid circular />
          <Container>
            <Header
              as="h5"
              content={`"Roostr saves me time and energy."`}
              style={{ fontSize: "1em" }}
            />
            <p style={{ color: "black" }}>- Joe, Seattle</p>
          </Container>
        </FlexRow>
      </Grid.Column>
      <Grid.Column style={{ marginTop: "2em" }}>
        <FlexRow>
          <Image src="https://joeschmoe.io/api/v1/jess" fluid circular />
          <Container>
            <Header
              as="h5"
              content={`"I love the customization. Each property is unique but being run equally efficiently."`}
              style={{ fontSize: "1em" }}
            />
            <p style={{ color: "black" }}>- Jess, Boston</p>
          </Container>
        </FlexRow>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column style={{ marginTop: "2em" }}>
        <FlexRow>
          <Image src="https://joeschmoe.io/api/v1/jana" fluid circular />
          <Container>
            <Header
              as="h5"
              content={`"My employees' productivity has increased and guest ratings are higher than ever."`}
              style={{ fontSize: "1em" }}
            />
            <p style={{ color: "black" }}>- Jana, Chicago</p>
          </Container>
        </FlexRow>
      </Grid.Column>

      <Grid.Column style={{ marginTop: "2em" }}>
        <FlexRow>
          <Image src="https://joeschmoe.io/api/v1/jon" fluid circular />
          <Container>
            <Header
              as="h5"
              content={`"Simple to use, from my office to on the go."`}
              style={{ fontSize: "1em" }}
            />
            <p style={{ color: "black" }}>- Jon, Chatanooga</p>
          </Container>
        </FlexRow>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

Testimonials.propTypes = {
  mobile: PropTypes.bool
};
