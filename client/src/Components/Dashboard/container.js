import { connect } from "react-redux";
import { registerUser } from "./actionCreator";
import Dashboard from "./Dashboard";
import { getProperties } from "../Properties/PropList/actionCreator";
import { getEmployees } from "../Employees/actionCreator";

const mapStateToProps = ({ registration }) => ({
  registration
});

export default connect(
  mapStateToProps,
  { registerUser, getProperties, getEmployees }
)(Dashboard);
