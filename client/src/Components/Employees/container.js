import { connect } from "react-redux";
import {
  getEmployees,
  searchEmployees,
  getNumberEmployees,
  getTaskList
} from "./actionCreator";
import Employees from "./Employees";

const mapStateToProps = ({ employees }) => {
  return employees;
};

export default connect(
  mapStateToProps,
  { getEmployees, searchEmployees, getNumberEmployees, getTaskList }
)(Employees);
