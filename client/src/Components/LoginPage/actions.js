import axios from "axios";
import config from "config";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const LOGIN_USER_LOADING = "LOGIN_USER_LOADING";

export const loginUser = credentials => {
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
