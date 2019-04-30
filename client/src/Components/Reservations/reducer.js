import * as actions from "./actions";

const initialState = {
  loading: true,
  error: false,
  reservations: [],
  reservation: {},
  properties: [],
  employees: [],
  reservationCount: 0,
  property: {}
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
    case actions.RESERVATION_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: payload.reservation
      };
    case actions.PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: payload.data
      };
    default:
      return { ...state };
  }
};

export default reservationsReducer;
