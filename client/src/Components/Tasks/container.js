import { connect } from "react-redux";
import { 
  getTasks,
  searchTasks,
  fetchProperties,
  fetchEmployees,
  fetchReservations,
  createTask,
  fetchTaskCount
} from "./actionCreator";
import _Tasks from "./Tasks";
import _TaskAdd from "./TaskAdd";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  tasks: state.tasks,
  properties: state.properties,
  employees: state.employees,
  reservations: state.reservations,
  loading: state.loading,
  taskCount: state.taskCount,
  error: state.error
});

const connector = connect(
  mapStateToProps,
  {
    getTasks,
    searchTasks,
    fetchProperties,
    fetchEmployees,
    fetchReservations,
    createTask,
    fetchTaskCount
  }
);

export const Tasks = connector(withRouter(_Tasks));
export const TaskAdd = connector(withRouter(_TaskAdd));
