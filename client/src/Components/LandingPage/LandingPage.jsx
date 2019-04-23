import PropTypes from "prop-types";
import React from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

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

// Current basic blue Semantic UI button color hex: #0080D6
// Background light blue: #f6f9fc
// Dark grey: #1a1b1c
// Icon green: #4ca34b

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const LandingPage = () => <ResponsiveContainer />;
export default LandingPage;
