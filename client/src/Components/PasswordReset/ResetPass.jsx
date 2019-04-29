import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexRow, FlexColumn } from "custom-components";
import axios from "axios";
import config from "config";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      newPassword: null,
      loading: true,
      open: false
    };
  }
  componentDidMount() {
    axios
      .post(`${config.apiUrl}/api/reset/verify`, {
        resetPasswordToken: this.props.match.params.token
      })
      .then(response => {
        this.setState({
          loading: false,
          id: response.data.id
        });
        console.log(this.state);
      })
      .catch(err => {
        this.setState({
          open: true,
          modalMessage: "Your link has expired. Please request a new reset."
        });
      });
  }
  render() {
    return (
      <FlexColumn>
        <Dimmer active={this.state.loading} page>
          <Loader size="large">Verifying</Loader>
        </Dimmer>
        <Modal open={this.state.open} size="large">
          <Modal.Content>
            <p>{this.state.modalMessage}</p>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/forgot">
              <Button color="blue">Request New Reset Link</Button>
            </Link>
          </Modal.Actions>
        </Modal>
      </FlexColumn>
    );
  }
}

export default ResetPass;

/* <p>
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
</p> */
