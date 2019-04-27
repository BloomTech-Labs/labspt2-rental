import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  properties: [],
  property: {},
  employees: [],
  user: {},
  reservations: [],
  tasks: [],
  propertyCount: null
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PROPERTY_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload.data
      };
    case actions.PROPERTY_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        propertyCount: action.payload
      };
    case actions.FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.payload.data
      };
    case actions.FETCH_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload.data
      };
    case actions.TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.data
      };
    case actions.PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload.data
      };
    case actions.ADD_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload.data
      };
    case actions.EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload.employees
      };
    case actions.DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actions.TASK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actions.USER_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case actions.USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return { ...state };
  }
};

export default propertyReducer;
