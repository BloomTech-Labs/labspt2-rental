import { connect } from "react-redux";
import { getEmployees, searchEmployees } from "./actionCreator";
import Employees from "./Employees";

const mapStateToProps = state => {
  return {
    employees: state.employees,
    loading: state.loading,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getEmployees, searchEmployees }
)(Employees);
