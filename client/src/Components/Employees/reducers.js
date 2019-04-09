import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  employees: []
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EMPLOYEE_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload
      };
    case actions.EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.NUM_EMPLOYEE_SUCCESS:
      const numPages = Math.ceil(action.payload / 4);
      return {
        ...state,
        numPages: numPages
      };
    case actions.NUM_EMPLOYEE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case actions.TASKLIST_SUCCESS:
      return {
        ...state,
        tasks: action.payload.data
      };
    case actions.TASKLIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case actions.PROPERTIES_SUCCESS:
      return {
        ...state,
        properties: action.payload.data
      };
    case actions.PROPERTIES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default employeesReducer;
