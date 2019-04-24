import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const registerUser = newUser => {
  return async dispatch => {
    dispatch({ type: actions.REGISTER_USER_STARTED });
    try {
      console.log('hey we are trying to hit the end point')
      const token = await axios.post(
        `${config.apiUrl}/api/users/register`,
        newUser
      );

      dispatch({
        type: actions.REGISTER_USER_SUCCESS,
        payload: "Bearer " + token.data.token
      });
      console.log('we registered')
    } catch (err) {
      console.log('uh oh', err.response.data.err)
      console.error(err.response.data.err);
      dispatch({
        type: actions.REGISTER_USER_FAILURE,
        payload: err.response.data.err.errmsg
      });
    }
  };
};

// "Error: Network Error
//     at e.exports (https://5cc09dbbeaa265017a1d18f3--roostr.netlify.com/static/js/2.6763ebf2.chunk.js:1:321370)
//     at XMLHttpRequest.p.onerror (https://5cc09dbbeaa265017a1d18f3--roostr.netlify.com/static/js/2.6763ebf2.chunk.js:1:320411)"
