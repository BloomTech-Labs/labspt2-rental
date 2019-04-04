import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

export const getEmployees = () => {
  return dispatch => {
    dispatch({ type: actions.EMPLOYEE_STARTED });
    axios
      .get(`${config.apiUrl}/api/employees`)
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
};
