import * as actions from "./actions";

const initialState = {
  loading: true,
  error: false,
  reservations: [],
  properties: [],
  employees: [],
  reservationCount: 0
};

const reservationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.RESERVATION_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: payload.reservations
      };
    case actions.PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: payload.properties
      };
    case actions.EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload.employees
      };
    case actions.RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      };
    case actions.RESERVATION_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        reservationCount: payload.reservationCount
      };
    default:
      return { ...state };
  }
};

export default reservationsReducer;
