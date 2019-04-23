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
        loading: false
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
        reservation: action.payload,
        property: action.payload.property,
        employee: action.payload.assistant
      };
    case actions.FETCH_RESERVATION_ERROR:
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
