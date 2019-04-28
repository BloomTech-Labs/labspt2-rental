import axios from "axios";

//needs action that sends email to user. hit endpoint /api/users/forgot, send email in req body.
export const RESET_STARTED = "RESET_STARTED";
export const RESET_SEND_SUCCESS = "RESET_SEND_SUCCESS";
export const RESET_SEND_FAILURE = "RESET_SEND_FAILURE";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_FAILURE = "RESET_FAILURE";

export const sendResetEmail = (req, res, next) => {
  return dispatch => {
    dispatch({ type: RESET_STARTED });
    axios
      .post("/api/users/forgot", req.body.email)
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
