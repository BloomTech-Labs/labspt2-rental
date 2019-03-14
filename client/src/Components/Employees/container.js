import { connect } from "react-redux";
import {} from "./actionCreator";
import EmployeeList from "./EmployeeList";

const mapStateToProps = state => ({
  employees: ["Jerry", "Kilroy", "Spader", "Lucy"]
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);
