import { connect } from "react-redux";
import { updateUser, getUser } from "./actionCreator";
import Settings from "./settings";

const mapStateToProps = ({ settings }) => ({
  loading: settings.loading,
  error: settings.error,
  user: settings.user
});

export default connect(
  mapStateToProps,
  { updateUser, getUser }
)(Settings);
