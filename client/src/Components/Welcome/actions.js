import axios from "axios";
import config from "config";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const LOGIN_USER_LOADING = "LOGIN_USER_LOADING";
export const USER_STARTED = "USER_STARTED";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

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
