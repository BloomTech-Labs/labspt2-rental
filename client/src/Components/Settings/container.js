import { connect } from "react-redux";
import {
  updateUser,
  getUser,
  updatePassword,
  getProperties,
  getSubscription
} from "./actionCreator";
import Settings from "./settings";

const mapStateToProps = ({ settings }) => ({
  loading: settings.loading,
  error: settings.error,
  user: settings.user,
  properties: settings.properties,
  subscription: settings.subscription
});

export default connect(
  mapStateToProps,
  { updateUser, getUser, updatePassword, getProperties, getSubscription }
)(Settings);
