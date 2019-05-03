import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

export const getEmployees = (filterSort = {}) => dispatch => {
  dispatch({ type: actions.EMPLOYEE_STARTED });

  // function that takes in a string (database) and the filterSort and returns the axios call (from search, if exists)
  function getInfo(database, filterSort = {}) {
    const { filter, sort, page, pageSize, search } = filterSort;
    database = search ? `${database}/search` : database;
    return axios.get(
      `${config.apiUrl}/api/${database}?search=${search ||
        ""}&filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    );
  }
  // function that takes in the filterSort and returns the count of employees
  function getCounts(filterSort = {}) {
    const { filter, search } = filterSort;
    return axios.get(
      `${config.apiUrl}/api/employees/count?search=${search ||
        ""}&filter=${JSON.stringify(filter) || ""}`
    );
  }

  function getUser() {
    return axios.get(`${config.apiUrl}/api/users/me`);
  }

  // gets all my information and sends it all over to the reducer
  return axios
    .all([
      getInfo("employees", filterSort),
      getInfo("properties"),
      getInfo("tasks"),
      getCounts(filterSort),
      getUser()
    ])
    .then(
      axios.spread((employees, properties, tasks, count, user) => {
        const numPages = Math.ceil(count.data.count / filterSort.pageSize);
        const result = {
          employees: employees.data.data,
          properties: properties.data.data,
          tasks: tasks.data.data,
          numPages: numPages,
          user: user.data.data
        };
        dispatch({ type: actions.EMPLOYEE_SUCCESS, payload: result });
      })
    )
    .catch(err => {
      dispatch({ type: actions.EMPLOYEE_FAILURE, error: err });
    });
};

export const createEmployee = body => dispatch => {
  return axios
    .post(`${config.apiUrl}/api/employees`, body)
    .then(({ data }) => {
      getEmployees();
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.EMPLOYEE_FAILURE, error: err });
    });
};

export const updateEmployee = (id, body) => dispatch => {
  return axios
    .put(`${config.apiUrl}/api/employees/${id}`, body)
    .then(({ data }) => {
      dispatch(getEmployees());
    })
    .catch(err => {
      dispatch({ type: actions.EMPLOYEE_FAILURE, error: err });
    });
};

export const updateProperty = (body = {}) => dispatch => {
  dispatch({ type: actions.EMPLOYEE_PROPERTY_STARTED });

  return axios
    .put(`${config.apiUrl}/api/properties/${body._id}`, body)
    .then(data => {
      dispatch({
        type: actions.EMPLOYEE_UPDATE_PROPERTY_SUCCESS,
        payload: data.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.EMPLOYEE_PROPERTY_FAILURE,
        payload: err
      });
    });
};

export const sendEmail = msg => dispatch => {
  dispatch({ type: actions.SENDGRID_STARTED });
  axios
    .post(`${config.apiUrl}/api/sendgrid/mail/send`, msg)
    .then(data => {
      dispatch({
        type: actions.SENDGRID_SUCCESS,
        payload: data.status
      });
    })
    .catch(err => {
      dispatch({
        type: actions.SENDGRID_FAILURE,
        payload: err
      });
    });
};
