import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  firstLogin,
  getUser,
  updatePassword,
  updateUser,
  sendEmail
} from "./actions";
import _FirstLogin from "./FirstLogin";
import _newUserUpdate from "./newUserUpdate";

const mapStateToProps = data => ({
  token: data.welcome.token,
  user: data.welcome.user,
  loading: data.welcome.loading
});

const connector = connect(
  mapStateToProps,
  {
    firstLogin,
    getUser,
    updatePassword,
    updateUser,
    sendEmail
  }
);

export const FirstLogin = connector(withRouter(_FirstLogin));
export const NewUserUpdate = connector(withRouter(_newUserUpdate));
