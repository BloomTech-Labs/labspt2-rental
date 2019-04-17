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
import Jon from './Testimonials/Jon.png';
import Jana from './Testimonials/Jana.png';
import Jess from './Testimonials/Jess.png';
import Joe from './Testimonials/Joe.png';
import { FlexColumn, FlexRow } from '../../custom-components/index';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

// Jess (female): <img src="//joeschmoe.io/api/v1/jess">
// Jon (male): <img src="//joeschmoe.io/api/v1/jon">
// Joe (male): <img src="//joeschmoe.io/api/v1/joe">
// Jana (female): <img src="//joeschmoe.io/api/v1/jana">

export const Testimonials = ({ mobile }) => (
    <Container 
        style={{ 
            backgroundColor: 'white', 
            width: '100%', 
            border: '1px solid black',
            marginTop: mobile ? "3em" : "14em",
            marginBottom: mobile ? "3em" : "4em",
            paddingBottom: mobile ? "2em" : "3em"
        }} 
        text
    >

          <Header
                as="h2"
                content="Our customers love Roostr"
                style={{
                fontSize: mobile ? "2em" : "3em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1em",
                marginBottom: mobile ? '0.5em' : '1em'
                }}
            />

        <Grid 
            columns={mobile ? 1 : 2} 
            divided 
            style={{ 
                marginLeft: mobile ? '1em' : '1em', 
                marginRight: mobile ? null : '1em',
                marginBottom: mobile ? '3em' : '4em'
                }}>
            <Grid.Row>
            <Grid.Column
                style={{
                    marginTop: mobile ? '1em' : '2em'
                }}
            >
                <FlexRow>
                <Image src={Jon} size='small' circular />
                <Container>
                <Header 
                    as="h5"
                    content="Roostr saves me time and energy."
                    style={{
                        fontSize: mobile ? "1em" : "1em"
                    }}
                />
                    <p style={{ color: 'black'}}>- Jon, San Francisco</p>
                </Container>
                </FlexRow>
            </Grid.Column>
            <Grid.Column
                style={{
                    marginTop: mobile ? '1em' : '2em'
                }}
            >
            <FlexRow>
                <Image src={Jess} size='small' circular />
                <Container>
                <Header 
                    as="h5"
                    content="Simple to use, from my office to my pocket on the go."
                    style={{
                        fontSize: mobile ? "1em" : "1em"
                    }}
                />
                    <p style={{ color: 'black'}}>- Jess, Boston</p>
                </Container>
                </FlexRow>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row >
            <Grid.Column
                style={{
                    marginTop: mobile ? '1em' : '2em',
                }}
            >
                <FlexRow>
                <Image src={Joe} size='small' circular />
                <Container>
                <Header 
                    as="h5"
                    content="I love the customization, to run my properties individually but with the same processes."
                    style={{
                        fontSize: mobile ? "1em" : "1em"
                    }}
                />
                    <p style={{ color: 'black'}}>- Joe, Chatanooga</p>
                </Container>
                </FlexRow>
            </Grid.Column>
            <Grid.Column
                style={{
                    marginTop: mobile ? '1em' : '2em'
                }}
            >
            <FlexRow>
                <Image src={Jana} size='small' circular />
                <Container>
                <Header 
                    as="h5"
                    content="My employees' productivity has increased and guests are rating higher than ever."
                    style={{
                        fontSize: mobile ? "1em" : "1em"
                    }}
                />
                    <p style={{ color: 'black'}}>- Jana, Seattle</p>
                </Container>
                </FlexRow>
            </Grid.Column>
            </Grid.Row>
        </Grid>

      <Link to="/register">
        <Button primary size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>

    </Container>
  );
  
  Testimonials.propTypes = {
    mobile: PropTypes.bool
  };