import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

// updateUser
// CC info and next billing will come from Stripe
// hard code billing plan IDs into update modal.

// keep Store updated with user info. If it changes, update
// use the billing plan ID to query billing table and send that to Stripe

export const getUser = user => {
  return async dispatch => {
    dispatch({ type: actions.USER_STARTED });
    try{
      const user = await axios.get(`${config.apiUrl}/api/users/me`)
      dispatch({
        type: actions.USER_SUCCESS,
        payload: user.data.data
      })
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.USER_ERROR, payload: err });
    }
  }
}

export const updateUser = user => {
  return async dispatch => {
    dispatch({ type: actions.USER_STARTED });
    try {
      const updatedUser = await axios.put(`${config.apiUrl}/api/users/me`, user);
      dispatch({
        type: actions.USER_SUCCESS,
        payload: updatedUser.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.USER_ERROR, payload: err });
    }
  };
};

export const updatePassword = password => {
  return async dispatch => {
    dispatch({ type: actions.USER_STARTED });
    try {
      const updatedPassword = await axios.put(`${config.apiUrl}/api/users/me/pass`, password);
      console.log('updatedPassword result', updatedPassword)
      dispatch({
        type: actions.USER_SUCCESS,
        payload: updatedPassword
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.USER_ERROR, payload: err });
    }
  };
};
