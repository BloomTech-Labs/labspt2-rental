import * as actions from "./actions";

const initialState = {
  loading: true,
  error: false,
  reservations: []
};

const reservationsReducer = (state = initialState, action) => {
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
      return { ...state };
  }
};

export default reservationsReducer;
