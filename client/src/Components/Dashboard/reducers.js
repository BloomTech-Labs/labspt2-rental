import * as actions from "./actions";

const initialState = {
  reservTotals: 0,
  reservActive: 0,
  propTotal: 0,
  propInactive: 0,
  emplTotal: 0,
  tasksToday: 0,
  tasksOverdue: 0
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
    default:
      return { ...state };
  }
};

export default dashboardReducer;
