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
        employees: action.employees
      };
    case actions.EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.NUM_EMPLOYEE_SUCCESS:
      const numPages = Math.ceil(action.number / 4)
      return {
        ...state,
        numPages: (action.number / 4)
      };
    case actions.NUM_EMPLOYEE_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default employeesReducer;
