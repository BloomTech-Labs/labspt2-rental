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
      console.log(actions.REGISTER_USER_SUCCESS);
      dispatch({
        type: actions.REGISTER_USER_SUCCESS,
        payload: "Bearer " + token
      });
    } catch (err) {
      console.log("inside of catch");
      console.error(err);
      dispatch({ type: actions.REIGSTER_USER_FAILURE, payload: err });
    }
  };
};
