import * as actions from './actions'

const initialState = {
  loading: false,
  error: null,
  token: null
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REGISTER_USER_STARTED:
      return {
        ...state,
        loading: true,
        token: action.payload
      }
    case actions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case actions.REIGSTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload}
    default:
      return state;
  }
}

export default registrationReducer;