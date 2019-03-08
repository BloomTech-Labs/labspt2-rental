import { LOADING, FOUND_USERS, ERROR } from "./actions";

const initialState = {
  users: [],
  loading: false,
  error: ""
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case FOUND_USERS:
      return { ...state, users: action.payload, loading: false };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default userListReducer;
