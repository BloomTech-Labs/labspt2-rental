import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getReservations = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize, search } = filterSort;

  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/reservations?filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(({ data }) => {
      dispatch({ type: actions.RESERVATION_SUCCESS, reservations: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
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
      dispatch({ type: actions.RESERVATION_SUCCESS, reservations: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
    });
};

export const fetchProperties = () => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(`${config.apiUrl}/api/properties`)
    .then(({ data }) => {
      dispatch({ type: actions.PROPERTIES_SUCCESS, properties: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
    });
};

export const fetchEmployees = () => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(`${config.apiUrl}/api/employees`)
    .then(({ data }) => {
      dispatch({ type: actions.EMPLOYEES_SUCCESS, employees: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
    });
};

export const createReservation = (body = {}) => dispatch => {
  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .post(`${config.apiUrl}/api/reservations`, body)
    .then(({ data }) => {
      dispatch({ type: actions.RESERVATION_SUCCESS, reservations: data.data });
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
      throw err;
    });
};
