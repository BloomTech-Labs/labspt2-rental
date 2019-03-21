import { connect } from "react-redux";
import { getEmployees } from "./actionCreator";
import EmployeeList from "./EmployeeList";

const mapStateToProps = state => {
  return {
    employees: state.employees,
    loading: state.loading,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getEmployees }
)(EmployeeList);
