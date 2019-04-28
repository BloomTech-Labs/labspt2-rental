import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendResetEmail } from "./actions";
import _ForgotPass from "./ForgotPass";
import _ResetPass from "./ResetPass";

const mapStateToProps = data => ({
  loading: data.reset.loading,
  error: data.reset.error,
  emailSent: data.reset.emailSent,
  user: data.reset.user
});

const connector = connect(
  mapStateToProps,
  { sendResetEmail }
);

export const ForgotPass = connector(withRouter(_ForgotPass));
export const ResetPass = connector(withRouter(_ResetPass));
