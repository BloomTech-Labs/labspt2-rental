import { connect } from "react-redux";
import { registerUser } from "./actionCreator";
import Dashboard from "./Dashboard";

const mapStateToProps = ({ registration }) => ({
  registration
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Dashboard);
