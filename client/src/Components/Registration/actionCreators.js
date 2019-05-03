import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const registerUser = newUser => {
  return async dispatch => {
    dispatch({ type: actions.REGISTER_USER_STARTED });
    try {
      const token = await axios.post(
        `${config.apiUrl}/api/users/register`,
        newUser
      );

      dispatch({
        type: actions.REGISTER_USER_SUCCESS,
        payload: "Bearer " + token.data.token
      });
    } catch (err) {
      dispatch({
        type: actions.REGISTER_USER_FAILURE,
        payload: err.response.data.err.errmsg
      });
    }
  };
};
