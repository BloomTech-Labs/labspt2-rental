import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "./actionCreator";
import { getEmployees } from "../Employees/actionCreator";
import { getTasks } from "../Tasks/actionCreator";
import { getReservations } from "../Reservations/actionCreator";
import { getProperties } from "../Properties/actionCreator";
import _Dashboard from "./Dashboard";
import _DashboardContent from "./DashboardContent";

// registration is never used from the Dashboard and so mapStateToProps has been rewritten to utilize state for the Dashboard components
const mapStateToProps = state => ({
  reservations: state.reservations,
  employees: state.employees,
  tasks: state.tasks,
  properties: state.properties
});

const connector = connect(
  mapStateToProps,
  { registerUser, getEmployees, getTasks, getReservations, getProperties }
);

export const Dashboard = connector(withRouter(_Dashboard));
export const DashboardContent = connector(withRouter(_DashboardContent));
