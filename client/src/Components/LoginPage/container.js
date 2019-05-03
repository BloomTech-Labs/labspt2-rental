import { connect } from "react-redux";
import { loginUser } from "./actions";
import LoginPage from "./LoginPage";

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
