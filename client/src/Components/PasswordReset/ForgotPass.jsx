import React, { Component } from "react";

class ForgotPass extends Component {
  render() {
    return (
      <p>
        This component needs to have an input for an email address. It needs to
        hit the `api/users/forgot` endpoint on the back end. That endpoint will
        send a reset email. The email from the input needs to be sent in the
        body of the request. This page needs to have a modal popup (or dimmer)
        that alerts the user to the fact that they will receive an email with a
        link that expires in one hour. Upon closing the modal or dimmer, this
        component should reroute the user to the landing page.
      </p>
    );
  }
}

export default ForgotPass;
