import * as actions from "./actions";

const initialState = {
  reservTotals: 0,
  reservActive: 0,
  propTotal: 0,
  propInactive: 0,
  emplTotal: 0,
  tasksToday: 0,
  tasksOverdue: 0,
  propertiesWithoutReservations: 0,
  employees: [],
  user: null,
  employeesTasks: {},
  loading: false
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNTS_STARTED:
      return { ...state, loading: true };
    case actions.COUNTS_SUCCESS:
      return Object.assign({}, state, action.payload);
    case actions.COUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actions.USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    default:
      return { ...state };
  }
};

export default dashboardReducer;
