import * as actions from "./actions";

const initialState = {
  loading: false,
  error: null,
  token: null
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESERVATION_STARTED:
      return {
        ...state,
        loading: true,
        token: action.payload
      };
    case actions.RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actions.RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default registrationReducer;
