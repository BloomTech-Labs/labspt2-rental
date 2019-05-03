import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  updateProperty,
  sendEmail
} from "./actionCreator";
import _Employees from "./Employees";
import _EmployeeAdd from "./EmployeeAdd";
import _EmployeeSingle from "./EmployeeSingle";

const mapStateToProps = ({ employees }) => {
  return employees;
};

const connector = connect(
  mapStateToProps,
  {
    getEmployees,
    createEmployee,
    updateEmployee,
    updateProperty,
    sendEmail
  }
);

export const Employees = connector(withRouter(_Employees));
export const EmployeeAdd = connector(withRouter(_EmployeeAdd));
export const EmployeeSingle = connector(withRouter(_EmployeeSingle));
