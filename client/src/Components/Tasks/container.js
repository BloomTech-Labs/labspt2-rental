import { connect } from "react-redux";
import { getTasks } from "./actionCreator";
import Tasks from "./Tasks";

const mapStateToProps = data => ({
  tasks: data.tasks.tasks,
  loading: data.tasks.loading,
  error: data.tasks.error
});

export default connect(
  mapStateToProps,
  { getTasks }
)(Tasks);

