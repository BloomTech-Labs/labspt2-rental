import { connect } from "react-redux";
import { registerUser } from "./actionCreators";
import RegistrationPage from "./RegistrationPage";

const mapStateToProps = ({ registration }) => ({
  registration
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegistrationPage);
