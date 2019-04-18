import PropTypes from "prop-types";
import React from "react";
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

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

// Keep Roostr short motto up front and top header. Find succinet 6-8 word way to describe it. (i.e. Teach your app to see emotions; Make your website better. Instantly; One app to manage your properties.)

// Then, 4 checkmark section: free to use for one property, we will not spam you with automated emails, you don't have to provide a CC unless you upgrade, simplify managing your short term rentals today

// OR a click bait type link to more: "Learn how Roostr helps your team increase productivity"

// OR pain point sections with images next to them: mobile responsive, seamless checkout, etc.

// Testimonials section. Images with short quotes on the left, scrolling. On the right, a comment about "Owners love how Roostr increases productivity and customer service, without increasing time spent managing." Using "trust" or "trusted by" sells better.

// Great product explanation: 6-8 word headers: "Create the perfect page with A/B testing", "Make changes quickly with the native editor"
// "Quickly add properties with custom task lists", "Easily assign tasks and properties to employees", "Customize employee permissions with the click of a button", "Stop organizing tasks, start prioritizing your team's work"


// Use a step to show simple customer checkout process or signup process

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const LandingPage = () => (
  <ResponsiveContainer>
  </ResponsiveContainer>
);
export default LandingPage;
