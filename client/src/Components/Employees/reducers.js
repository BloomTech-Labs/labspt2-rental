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
        employees: action.payload.employees,
        properties: action.payload.properties,
        tasks: action.payload.tasks,
        numPages: action.payload.numPages,
        user: action.payload.user
      };
    case actions.EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default employeesReducer;
