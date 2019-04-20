import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  reservation: {},
  property: {},
  employee: {}
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHECKOUT_STARTED:
    return {
      ...state,
      loading: true
    };
  case actions.CHECKOUT_SUCCESS:
    return {
      ...state,
      loading: false,
      // set billing success
    };
  case actions.CHECKOUT_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error
    };
    case actions.FETCH_RESERVATION_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: action.payload
      };
    case actions.FETCH_RESERVATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.FETCH_PROPERTY_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload
      };
    case actions.FETCH_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case actions.FETCH_EMPLOYEE_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.payload
      };
    case actions.FETCH_EMPLOYEE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default checkoutReducer;
