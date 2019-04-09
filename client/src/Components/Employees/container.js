import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getEmployees,
  searchEmployees,
  getNumberEmployees,
  getTaskList,
  createEmployee
} from "./actionCreator";
import _Employees from "./Employees";
import _EmployeeAdd from "./EmployeeAdd";

const mapStateToProps = ({ employees }) => {
  return employees;
};

const connector = connect(
  mapStateToProps,
  {
    getEmployees,
    searchEmployees,
    getNumberEmployees,
    getTaskList,
    createEmployee
  }
);

export const Employees = connector(withRouter(_Employees));
export const EmployeeAdd = connector(withRouter(_EmployeeAdd));