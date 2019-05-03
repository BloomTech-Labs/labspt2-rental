import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";

export const Footer = ({ mobile }) => (
  <Segment
    inverted
    vertical
    style={{ padding: mobile ? "0em 0em 2em 0em" : "5em 0em" }}
  >
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="About" />
            <List inverted>
              <List.Item as="a">Sitemap</List.Item>
              <List.Item as="a">Sign Up</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={5}>
            <Header inverted as="h4" content="Services" />
            <List inverted>
              <List.Item as="a">Contact Us</List.Item>
              <List.Item as="a">Roostr.tech@gmail.com</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={6}>
            <Header as="h4" inverted>
              roostr.tech
            </Header>
            <p>One home for managing all your properties.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

Footer.propTypes = {
  mobile: PropTypes.bool
};
