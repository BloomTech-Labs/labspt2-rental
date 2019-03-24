import { connect } from "react-redux";
import { updateUser } from "./actionCreator";
import Settings from "./settings";

const mapStateToProps = ({ settings }) => ({
  settings
});

const mapDispatchToProps = () => ({
  updateUser
});

export default connect(
  mapStateToProps,
  { updateUser }
)(Settings);
