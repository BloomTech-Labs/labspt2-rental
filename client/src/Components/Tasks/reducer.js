import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  tasks: []
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_TASK_ATTEMPT:
      return {
        ...state
      };
    case actions.FETCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.data
      };
    case actions.FETCH_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default taskReducer;
