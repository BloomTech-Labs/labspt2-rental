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
    case actions.RESERVATION_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: action.payload
      };
    case actions.RESERVATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.PROPERTY_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload
      };
    case actions.PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case actions.EMPLOYEE_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.payload
      };
    case actions.EMPLOYEE_ERROR:
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
