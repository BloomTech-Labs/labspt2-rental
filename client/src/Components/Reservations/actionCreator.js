import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getReservations = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize } = filterSort;

  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/reservations?filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATION_SUCCESS,
        payload: { reservations: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};

export const searchReservations = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize, search } = filterSort;

  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/reservations/search?search=${search ||
        ""}&filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATION_SUCCESS,
        payload: { reservations: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};

export const createReservation = (body = {}) => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .post(`${config.apiUrl}/api/reservations`, body)
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATION_SUCCESS,
        payload: { reservations: data.data }
      });
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
      throw err;
    });
};

export const updateReservation = (body = {}) => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .put(`${config.apiUrl}/api/reservations/${body._id}`, body)
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATION_SUCCESS,
        payload: { reservations: data.data }
      });
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
      throw err;
    });
};

export const fetchProperties = () => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(`${config.apiUrl}/api/properties`)
    .then(({ data }) => {
      dispatch({
        type: actions.PROPERTIES_SUCCESS,
        payload: { properties: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};

export const fetchProperty = id => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(`${config.apiUrl}/api/properties/${id}`)
    .then(data => {
      dispatch({ type: actions.PROPERTY_SUCCESS, payload: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};

export const fetchEmployees = () => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(`${config.apiUrl}/api/employees`)
    .then(({ data }) => {
      dispatch({
        type: actions.EMPLOYEES_SUCCESS,
        payload: { employees: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};

export const fetchReservationCount = (status = null) => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/reservations/count?filter=${JSON.stringify({
        status
      })}`
    )
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATION_COUNT_SUCCESS,
        payload: { reservationCount: data.count }
      });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};

export const fetchSingleReservation = id => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(`${config.apiUrl}/api/reservations/${id}`)
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATION_SINGLE_SUCCESS,
        payload: { reservation: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, payload: err });
    });
};
