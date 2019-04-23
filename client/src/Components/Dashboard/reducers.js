import * as actions from "./actions";

const initialState = {
  reservTotals: 0,
  reservActive: 0,
  propTotal: 0,
  propInactive: 0,
  emplTotal: 0,
  tasksToday: 0,
  tasksOverdue: 0,
  user: null
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNTS_SUCCESS:
      return Object.assign({}, state, action.payload);
    case actions.COUNTS_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    case actions.USER_ROLE_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return { ...state };
  }
};

export default dashboardReducer;
