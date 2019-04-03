import { connect } from "react-redux";
import { updateUser, getUser } from "./actionCreator";
import Settings from "./settings";

const mapStateToProps = ({ user }) => ({
  firstName: user
});

// const mapDispatchToProps = () => ({
//   updateUser, getUser
// });

export default connect(
  mapStateToProps,
  { updateUser, getUser }
)(Settings);
