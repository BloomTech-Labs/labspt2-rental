import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getProperties = () => {
  return dispatch => {
    dispatch({
      type: actions.FETCH_PROPERTY_ATTEMPT
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
          type: actions.FETCH_PROPERTY_FAILURE,
          error: err
        });
      });
  };
};

export const getProperty = id => {
  return dispatch => {
    dispatch({
      type: actions.FETCH_PROPERTY_ATTEMPT
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
          type: actions.FETCH_PROPERTY_FAILURE,
          error: err
        });
      });
  };
};

export const updateProperty = (body = {}) => dispatch => {
  dispatch({ type: actions.UPDATE_PROPERTY_STARTED });

  return axios
    .put(`${config.apiUrl}/api/properties/${body._id}`, body)
    .then(({ data }) => {
      dispatch({
        type: actions.UPDATE_PROPERTY_SUCCESS,
        payload: data.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.UPDATE_PROPERTY_FAILURE,
        payload: err
      });
    });
};
