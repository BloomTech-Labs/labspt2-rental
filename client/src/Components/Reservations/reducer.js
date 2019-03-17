import * as actions from "./actions";

const initialState = {
  loading: false,
  error: null,
  reservations: null
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESERVATION_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.reservations
      };
    case actions.RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default registrationReducer;
