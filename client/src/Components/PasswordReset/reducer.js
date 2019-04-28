import {
  RESET_STARTED,
  RESET_SEND_SUCCESS,
  RESET_SEND_FAILURE,
  RESET_SUCCESS,
  RESET_FAILURE
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  emailSent: false,
  user: {}
};

const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STARTED:
      return {
        ...state,
        loading: true
      };
    case RESET_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        emailSent: true
      };
    case RESET_SEND_FAILURE:
      return {
        ...state,
        loading: false,
        emailSent: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default resetReducer;
