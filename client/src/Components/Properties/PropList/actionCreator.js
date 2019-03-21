import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getProperties = () => {
  return dispatch => {
    dispatch({
      type: actions.FETCH_PROPERTY_ATTEMPT
    });
    axios
      .get(`${config.apiUrl}/api/properties`)
      .then(response => {
        dispatch({
          type: actions.FETCH_PROPERTY_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actions.FETCH_PROPERTY_FAILURE,
          payload: "Could not fetch properties."
        });
      });
  };
};
