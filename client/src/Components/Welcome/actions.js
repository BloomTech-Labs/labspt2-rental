import axios from "axios";
import config from "config";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const LOGIN_USER_LOADING = "LOGIN_USER_LOADING";
export const USER_STARTED = "USER_STARTED";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";
export const SENDGRID_STARTED = "SENDGRID_STARTED";
export const SENDGRID_SUCCESS = "SENDGRID_SUCCESS";
export const SENDGRID_FAILURE = "SENDGRID_FAILURE";

export const firstLogin = credentials => {
  return async dispatch => {
    dispatch({ type: LOGIN_USER_LOADING });

    try {
      const token = await axios.post(
        `${config.apiUrl}/api/users/login`,
        credentials
      );
      localStorage.setItem("authToken", "Bearer " + token.data.token);

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: "Bearer " + token.data.token
      });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err
      });
    }
  };
};

export const getUser = () => {
  return async dispatch => {
    dispatch({ type: USER_STARTED });
    try {
      const user = await axios.get(`${config.apiUrl}/api/users/me`);
      dispatch({
        type: USER_SUCCESS,
        payload: user.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: USER_ERROR, payload: err });
    }
  };
};

export const updatePassword = password => {
  return async dispatch => {
    dispatch({ type: USER_STARTED });
    try {
      const updatedPassword = await axios.put(
        `${config.apiUrl}/api/users/me/pass`,
        password
      );
      dispatch({
        type: USER_SUCCESS,
        payload: updatedPassword.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: USER_ERROR, payload: err });
    }
  };
};

export const updateUser = user => {
  return async dispatch => {
    dispatch({ type: USER_STARTED });
    try {
      const updatedUser = await axios.put(
        `${config.apiUrl}/api/users/me`,
        user
      );
      dispatch({
        type: USER_SUCCESS,
        payload: updatedUser.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: USER_ERROR, payload: err });
    }
  };
};

export const sendEmail = msg => dispatch => {
  dispatch({ type: SENDGRID_STARTED });
  axios
    .post(`${config.apiUrl}/api/sendgrid/mail/send`, msg)
    .then(data => {
      dispatch({
        type: SENDGRID_SUCCESS,
        payload: data.status
      });
    })
    .catch(err => {
      dispatch({
        type: SENDGRID_FAILURE,
        payload: err
      });
    });
};
