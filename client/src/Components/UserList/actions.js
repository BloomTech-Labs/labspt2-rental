import axios from "axios";

export const FETCH_USERS_ATTEMPT = "FETCH_USERS_ATTEMPT";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({
      type: FETCH_USERS_ATTEMPT
    });
    axios
      .get("http://138.197.202.158/api/users")
      .then(response => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: "Could not fetch users."
        });
      });
  };
};
