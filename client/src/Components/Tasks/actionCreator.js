import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getTasks = () => {
  return dispatch => {
    dispatch({
      type: actions.FETCH_TASK_ATTEMPT
    });
    axios
      .get(`${config.apiUrl}/api/tasks`)
      .then(response => {
        console.log(response);
        dispatch({
          type: actions.FETCH_TASK_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.FETCH_TASK_FAILURE,
          error: err
        });
      });
  };
};

export const searchTasks = (filterSort = {}) => {
  const { filter, sort, search } = filterSort;

  return dispatch => {
    dispatch({
      type: actions.FETCH_TASK_ATTEMPT
    });
    axios
      .get(
        `${config.apiUrl}/api/tasks/search?search=${search || ""}&sort=${sort}`
      )
      .then(response => {
        console.log(response);
        dispatch({
          type: actions.FETCH_TASK_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.FETCH_TASK_FAILURE,
          error: err
        });
      });
  };
};


// Needed For TaskAdd Page
export const fetchProperties = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/properties`)
    .then(({ data }) => {
      dispatch({
        type: actions.PROPERTIES_SUCCESS,
        payload: { properties: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

export const fetchEmployees = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/employees`)
    .then(({ data }) => {
      dispatch({
        type: actions.EMPLOYEES_SUCCESS,
        payload: { employees: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

export const fetchReservations = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/reservations`)
    .then(({ data }) => {
      dispatch({
        type: actions.RESERVATIONS_SUCCESS,
        payload: { reservations: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};
