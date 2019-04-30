import { connect } from "react-redux";
import {
  getTasks,
  searchTasks,
  fetchProperties,
  fetchEmployees,
  fetchReservations,
  createTask,
  fetchTaskCount,
  updateTask,
  toggleTask,
  deleteTask,
  fetchIncompletedTaskCount,
  fetchUserLog
} from "./actionCreator";
import _Tasks from "./Tasks";
import _TaskAdd from "./TaskAdd";
import _TaskEdit from "./TaskEdit";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  tasks: state.tasks,
  properties: state.properties,
  employees: state.employees,
  reservations: state.reservations,
  loading: state.loading,
  taskCount: state.taskCount,
  incompletedTaskCount: state.incompletedTaskCount,
  user: state.user,
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
    fetchTaskCount,
    updateTask,
    toggleTask,
    deleteTask,
    fetchIncompletedTaskCount,
    fetchUserLog
  }
);

export const Tasks = connector(withRouter(_Tasks));
export const TaskAdd = connector(withRouter(_TaskAdd));
export const TaskEdit = connector(withRouter(_TaskEdit));
