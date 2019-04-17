import { connect } from "react-redux";
import {
  updateUser,
  getUser,
  updatePassword,
  getProperties
} from "./actionCreator";
import Settings from "./settings";

const mapStateToProps = ({ settings }) => ({
  loading: settings.loading,
  error: settings.error,
  user: settings.user,
  properties: settings.properties
});

export default connect(
  mapStateToProps,
  { updateUser, getUser, updatePassword, getProperties }
)(Settings);
