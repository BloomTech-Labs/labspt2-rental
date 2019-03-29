import { connect } from "react-redux";
import { getTasks } from "./actionCreator";
import Tasks from "./Tasks";

const mapStateToProps = data => ({
  tasks: data.tasks,
  loading: data.loading,
  error: data.error
});

export default connect(
  mapStateToProps,
  { getTasks }
)(Tasks);

