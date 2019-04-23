import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  user: {},
  properties: []
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.STRIPE_USER_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.STRIPE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case actions.STRIPE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.STRIPE_PROPERTY_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.STRIPE_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload
      };
    case actions.STRIPE_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default settingsReducer;
