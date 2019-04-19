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
        loading: false,
        // tasks: payload.data
      };
    case actions.PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: payload.properties
      };
    case actions.EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload.employees
      };
    case actions.RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload.reservations
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
