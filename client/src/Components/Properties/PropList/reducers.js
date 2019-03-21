import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  properties: []
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_PROPERTY_ATTEMPT:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.properties
      };
    case actions.FETCH_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default propertyReducer;
