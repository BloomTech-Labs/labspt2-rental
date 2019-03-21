import axios from "axios";
import * as actions from "./actions";
import config from "config";

const getProperties = () => {
  return dispatch => {
    dispatch({
      type: actions.FETCH_PROPERTY_ATTEMPT
    });
    axios
      .get(`${config.apiUrl}/api/properties`)
      .then(response => {
        console.log(response);
        dispatch({
          type: actions.FETCH_PROPERTY_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actions.FETCH_PROPERTY_FAILURE,
          error: err
        });
      });
  };
};

export default getProperties;
