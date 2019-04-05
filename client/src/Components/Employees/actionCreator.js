import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

export const getEmployees = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize } = filterSort;

  dispatch({ type: actions.EMPLOYEE_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/employees?filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(({ data }) => {
      dispatch({
        type: actions.EMPLOYEE_SUCCESS,
        employees: data.data
      });
    })
    .catch(err => {
      dispatch({ type: actions.EMPLOYEE_FAILURE, error: err });
    });
};

export const searchEmployees = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize, search } = filterSort;

  dispatch({ type: actions.EMPLOYEE_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/employees/search?search=${search ||
        ""}&filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(({ data }) => {
      dispatch({ type: actions.EMPLOYEE_SUCCESS, employees: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.EMPLOYEE_FAILURE, error: err });
    });
};

export const getNumberEmployees = (filterSort = {}) => {
  const { filter, sort, page, search } = filterSort;
  const pageSize=10000

  return dispatch => {
    axios
    .get(
      `${config.apiUrl}/api/employees/search?search=${search ||
        ""}&filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
      .then(data => {
        console.log(data.data.data, filterSort)

        dispatch({
          type: actions.NUM_EMPLOYEE_SUCCESS,
          number: data.data.data.length
        });
      })
      .catch(err => {
        dispatch({ type: actions.NUM_EMPLOYEE_FAIL, error: err });
      });
  };
};
