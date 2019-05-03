import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  employees: [],
  sendgridStatus: null
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
    case actions.EMPLOYEE_PROPERTY_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.EMPLOYEE_UPDATE_PROPERTY_SUCCESS:
      return {
        ...state
      };
    case actions.EMPLOYEE_PROPERTY_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case actions.SENDGRID_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case actions.SENDGRID_SUCCESS:
      return {
        ...state,
        sendgridStatus: action.payload
      };
    case actions.SENDGRID_STARTED:
      return {
        ...state,
        loading: true
      };
    default:
      return { ...state };
  }
};

export default employeesReducer;
