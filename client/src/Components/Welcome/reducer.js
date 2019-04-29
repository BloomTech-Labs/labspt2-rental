import {
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  USER_STARTED,
  USER_ERROR,
  USER_SUCCESS
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  token: null,
  user: {}
};

const newLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case USER_STARTED:
      return {
        ...state,
        loading: true
      };

    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };

    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default newLoginReducer;
