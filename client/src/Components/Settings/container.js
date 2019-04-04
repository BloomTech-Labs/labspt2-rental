import { connect } from "react-redux";
import { updateUser, getUser } from "./actionCreator";
import Settings from "./settings";

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  { updateUser, getUser }
)(Settings);
