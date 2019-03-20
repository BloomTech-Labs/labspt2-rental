import {
  FETCH_USERS_ATTEMPT,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./actions";

const initialState = {
  users: [],
  loading: false,
  error: ""
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_ATTEMPT:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case FETCH_USERS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default userListReducer;
