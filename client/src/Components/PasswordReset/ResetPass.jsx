import React, { Component } from "react";

class ResetPass extends Component {
  render() {
    return (
      <>
        <p>
          This component should render at `/forgot/:token`, with the token being
          generated in the ForgotPass component and emailed to the user. This
          component needs to have a CDM that hits the `/api/users/reset`
          endpoint to verify that the token has not expired. The token from the
          url needs to be sent in body of the request.{" "}
        </p>
        <p>
          While the verification is being completed, this page needs to be in
          loading status with a spinner. If verification is successful,
          this.setState should change loading to false. If verification is not
          successful, have a modal pop up that redirects them to the ForgotPass
          component to resend the email.
        </p>
        <p>
          Upon successful verification, the page will render with a form to
          reset the password. A submit button should have a method that hits the
          `/api/users/updateByEmail` endpoint. This requires the user id as _id
          and the new password as newPassword in the request body. If update is
          complete, a 200 is returned and a modal should pop up directing the
          user back to the landing page to login with their new credentials. If
          it is not successful, an error modal should pop up.
        </p>
      </>
    );
  }
}

export default ResetPass;
