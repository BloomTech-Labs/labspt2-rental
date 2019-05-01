import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  tasks: [],
  reservations: [],
  properties: [],
  employees: [],
  taskCount: 0
};

const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_TASK_ATTEMPT:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: payload.data
      };
    case actions.TASK_TOGGLE_SUCCESS:
      return {
        ...state,
        loading: false
        // tasks: payload.data
      };
    case actions.TASKS_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: payload.properties
      };
    case actions.TASKS_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload.employees
      };
    case actions.TASKS_RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: payload.reservations
      };
    case actions.TASK_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        taskCount: payload.taskCount
      };
    // Added for Delete
    case actions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        taskCount: payload.data
      };
    case actions.TASKS_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user
      };
    case actions.TASK_INCOMPLETED_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        overdueIncompleted: payload.overdueIncompleted,
        duetodayIncompleted: payload.duetodayIncompleted,
        upcomingIncompleted: payload.upcomingIncompleted
      };
    case actions.FETCH_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      };
    default:
      return { ...state };
  }
};

export default taskReducer;
