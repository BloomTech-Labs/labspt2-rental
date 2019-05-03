import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getProperties = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize } = filterSort;

  dispatch({ type: actions.PROPERTY_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/properties?filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(response => {
      dispatch({
        type: actions.FETCH_PROPERTIES_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: actions.PROPERTY_FAILURE, payload: err });
    });
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
export const searchProperties = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize, search } = filterSort;

  dispatch({ type: actions.PROPERTY_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/properties/search?search=${search ||
        ""}&filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(response => {
      dispatch({
        type: actions.FETCH_PROPERTIES_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: actions.PROPERTY_FAILURE, payload: err });
    });
};

export const fetchPropertyCount = active => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/properties/count?filter=${JSON.stringify(active)}`
    )
    .then(response => {
      dispatch({
        type: actions.PROPERTY_COUNT_SUCCESS,
        payload: response.data.count
      });
    })
    .catch(err => {
      dispatch({ type: actions.PROPERTY_FAILURE, payload: err });
    });
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

export const getUser = user => {
  return async dispatch => {
    dispatch({ type: actions.USER_STARTED });
    try {
      const user = await axios.get(`${config.apiUrl}/api/users/me`);
      dispatch({
        type: actions.USER_SUCCESS,
        payload: user.data.data
      });
    } catch (err) {
      dispatch({ type: actions.USER_ERROR, payload: err });
    }
  };
};

export const getTasks = () => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });
  return axios
    .get(`${config.apiUrl}/api/tasks/`)
    .then(response => {
      dispatch({ type: actions.TASK_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: actions.PROPERTY_FAILURE, payload: err });
    });
};

export const deleteTasks = id => dispatch => {
  dispatch({ type: actions.PROPERTY_STARTED });
  return axios.delete(`${config.apiUrl}/api/tasks/`, id).then(response => {
    dispatch({
      type: actions.TASK_DELETE_SUCCESS,
      payload: response.data
    }).catch(err => {
      dispatch({ type: actions.PROPERTY_FAILURE, payload: err });
    });
  });
};
