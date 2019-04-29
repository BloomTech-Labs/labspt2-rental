import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getEverything, getUserRole, dashboardGetEmployees } from "./actionCreator";
import _Dashboard from "./Dashboard";
import _DashboardContent from "./DashboardContent";

const mapStateToProps = ({ dashboard }) => dashboard;

const connector = connect(
  mapStateToProps,
  { getEverything, getUserRole, dashboardGetEmployees }
);

export const Dashboard = connector(withRouter(_Dashboard));
export const DashboardContent = connector(withRouter(_DashboardContent));
