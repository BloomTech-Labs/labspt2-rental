import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Features to promote:

// - Remotely organize all your properties and employees easily, from one dashboard
// - Give your guests a simple page to track all their upcoming stay information 
// - Checkout cart integration utilizes Stripe to securely, easily and quickly process guest reservation charges, no matter where in the world they're located.
// - Create checklists custom to each property, reservation or employee. Employees can easily keep themselves on track 
// - View unfinished tasks, or order by upcoming, current and completed.
// - You control permissions. Employees can be as autonomous as you let them be. Have a manager who can re-assign tasks and handle several properties? Give them the ability in their settings. 
// - Mobile responsive. Never be limited by being on the go. Business doesn't wait for anyone. Now you can manage your properties from anywhere, any device. 
// - Clean UX with thoughtful touches in mind. 
// - Simple billing plan that automatically updates as your business grows - and decreases when it isn't being used. We believe in transparency so you'll always know when your bill changes


// Testimonials

// Jess (female): <img src="//joeschmoe.io/api/v1/jess">
// Jon (male): <img src="//joeschmoe.io/api/v1/jon">
// Joe (male): <img src="//joeschmoe.io/api/v1/joe">
// Jana (female): <img src="//joeschmoe.io/api/v1/jana">

// Current basic blue Semantic UI button color hex: 0080D6

// Keep Roostr short motto up front and top header. Find succinet 6-8 word way to describe it. (i.e. Teach your app to see emotions; Make your website better. Instantly; One app to manage your properties.)

// Then, 4 checkmark section: free to use for one property, we will not spam you with automated emails, you don't have to provide a CC unless you upgrade, simplify managing your short term rentals today

// OR a click bait type link to more: "Learn how Roostr helps your team increase productivity"

// OR pain point sections with images next to them: mobile responsive, seamless checkout, etc.

// Testimonials section. Images with short quotes on the left, scrolling. On the right, a comment about "Owners love how Roostr increases productivity and customer service, without increasing time spent managing." Using "trust" or "trusted by" sells better.

// Great product explanation: 6-8 word headers: "Create the perfect page with A/B testing", "Make changes quickly with the native editor"
// "Quickly add properties with custom task lists", "Easily assign tasks and properties to employees", "Customize employee permissions with the click of a button", "Stop organizing tasks, start prioritizing your team's work"


// Use a step to show simple customer checkout process or signup process

// const StepExampleOrdered = () => (
//   <Step.Group ordered>
//     <Step completed>
//       <Step.Content>
//         <Step.Title>Shipping</Step.Title>
//         <Step.Description>Choose your shipping options</Step.Description>
//       </Step.Content>
//     </Step>

//     <Step completed>
//       <Step.Content>
//         <Step.Title>Billing</Step.Title>
//         <Step.Description>Enter billing information</Step.Description>
//       </Step.Content>
//     </Step>

//     <Step active>
//       <Step.Content>
//         <Step.Title>Confirm Order</Step.Title>
//       </Step.Content>
//     </Step>
//   </Step.Group>
// )


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="roostr.io"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="The easy way to mange your Roost"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Link to="/register">
      <Button primary size="huge">
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Link>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
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
            style={{ minHeight: 700, padding: "1em 0em" }}
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
                    <Button as="a" inverted={!fixed}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      as="a"
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
            <HomepageHeading />
          </Segment>
        </Visibility>
        <SimpleSlider></SimpleSlider>
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
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
        as={Sidebar.Pushable}
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
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    );
  }
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Do We Want Services?</List.Item>
                <List.Item as="a">Centaur Training</List.Item>
                <List.Item as="a">Sleight of Hand Magic</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                roostr.io
              </Header>
              <p>It's easy. Just give us your money and use our application.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
