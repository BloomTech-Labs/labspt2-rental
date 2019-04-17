import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser, getEverything } from "./actionCreator";
import _Dashboard from "./Dashboard";
import _DashboardContent from "./DashboardContent";

// registration is never used from the Dashboard and so mapStateToProps has been rewritten to utilize state for the Dashboard components
const mapStateToProps = ({dashboard}) => dashboard;

const connector = connect(
  mapStateToProps,
  { registerUser, getEverything }
);

export const Dashboard = connector(withRouter(_Dashboard));
export const DashboardContent = connector(withRouter(_DashboardContent));
