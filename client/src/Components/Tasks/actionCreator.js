import axios from 'axios';
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