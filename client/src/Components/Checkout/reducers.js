import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  reservation: {}
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_RESERVATION_ATTEMPT:
      return {
        ...state
      };
    case actions.FETCH_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: action.payload.data
      };
    case actions.FETCH_RESERVATION_FAILURE:
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
