import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firstLogin } from "./actions";
import _FirstLogin from "./FirstLogin";
import _newUserUpdate from "./newUserUpdate";

const mapStateToProps = ({ auth }) => ({
  auth
});

const connector = connect(
  mapStateToProps,
  {
    firstLogin
  }
);

export const FirstLogin = connector(withRouter(_FirstLogin));
export const NewUserUpdate = connector(withRouter(_newUserUpdate));
