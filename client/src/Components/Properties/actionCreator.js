import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getProperties = () => {
  return dispatch => {
    dispatch({
      type: actions.PROPERTY_STARTED
    });
    axios
      .get(`${config.apiUrl}/api/properties`)
      .then(response => {
        dispatch({
          type: actions.FETCH_PROPERTIES_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.PROPERTY_FAILURE,
          error: err
        });
      });
  };
};
export const getReservations = () => {
  return dispatch => {
    dispatch({
      type: actions.PROPERTY_STARTED
    });
    axios
      .get(`${config.apiUrl}/api/reservations`)
      .then(response => {
        dispatch({
          type: actions.FETCH_RESERVATIONS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.PROPERTY_FAILURE,
          error: err
        });
      });
  };
};
export const getProperty = id => {
  return dispatch => {
    dispatch({
      type: actions.PROPERTY_STARTED
    });
    axios
      .get(`${config.apiUrl}/api/properties/${id}`)
      .then(response => {
        dispatch({
          type: actions.FETCH_PROPERTY_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.PROPERTY_FAILURE,
          error: err
        });
      });
  };
};

export const updateProperty = (body = {}) => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });

  return axios
    .put(`${config.apiUrl}/api/properties/${body._id}`, body)
    .then(({ response }) => {
      dispatch({
        type: actions.UPDATE_PROPERTY_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.PROPERTY_FAILURE,
        payload: err
      });
    });
};

export const addProperty = (body = {}) => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });
  return axios
    .post(`${config.apiUrl}/api/properties`, body)
    .then(response => {
      console.log(response);
      dispatch({
        type: actions.ADD_PROPERTY_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.PROPERTY_FAILURE,
        payload: err
      });
    });
};

export const getEmployees = () => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });
  return axios
    .get(`${config.apiUrl}/api/employees`)
    .then(({ data }) => {
      dispatch({
        type: actions.EMPLOYEES_SUCCESS,
        payload: { employees: data.data }
      });
    })
    .catch(err => {
      dispatch({
        type: actions.PROPERTY_FAILURE,
        payload: err
      });
    });
};

export const deleteProperty = id => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });
  return axios
    .delete(`${config.apiUrl}/api/properties/${id}`)
    .then(response => {
      dispatch({
        type: actions.DELETE_PROPERTY_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.PROPERTY_FAILURE,
        payload: err
      });
    });
};
