import axios from "axios";

export const LOADING = "LOADING";
export const FOUND_USERS = "FOUND_USERS";
export const ERROR = "ERROR";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({
      type: LOADING
    });
    axios
      .get("http://138.197.202.158/api/users")
      .then(response => {
        dispatch({
          type: FOUND_USERS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          payload: "Could not fetch users."
        });
      });
  };
};
