import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {} from "./actions";
import _ForgotPass from "./ForgotPass";
import _ResetPass from "./ResetPass";

const mapStateToProps = data => ({ user: data.user.user });

const connector = connect(
  mapStateToProps,
  {}
);

export const ForgotPass = connector(withRouter(_ForgotPass));
export const ResetPass = connector(withRouter(_ResetPass));
