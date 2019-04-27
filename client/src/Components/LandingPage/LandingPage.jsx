import PropTypes from "prop-types";
import React from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

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
