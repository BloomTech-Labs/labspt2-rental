import { connect } from "react-redux";
import { getTasks } from "./actionCreator";
import Tasks from "./Tasks";

const mapStateToProps = state => ({
  tasks: state.tasks,
  loading: state.loading,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getTasks }
)(Tasks);

