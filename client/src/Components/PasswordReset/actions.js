import axios from "axios";
import config from "config";
//needs action that sends email to user. hit endpoint /api/users/forgot, send email in req body.
export const RESET_STARTED = "RESET_STARTED";
export const RESET_SEND_SUCCESS = "RESET_SEND_SUCCESS";
export const RESET_SEND_FAILURE = "RESET_SEND_FAILURE";

export const sendResetEmail = email => {
  return dispatch => {
    dispatch({ type: RESET_STARTED });
    axios
      .post(`${config.apiUrl}/api/users/forgot`, email)
      .then(data => {
        dispatch({ type: RESET_SEND_SUCCESS, payload: data.status });
      })
      .catch(err => {
        dispatch({
          type: RESET_SEND_FAILURE,
          error: err
        });
      });
  };
};
