import axios from 'axios';
import * as actions from "./actions";
import config from "config";

export const getReservation = (id) => {
  return dispatch => {
    dispatch({
      type: actions.FETCH_RESERVATION_ATTEMPT
    });
    axios
      .get(`${config.apiUrl}/api/reservations/{id}`)
      .then(response => {
        dispatch({
          type: actions.FETCH_RESERVATION_SUCCESS,
          payload: response.data
        });
      })
    .catch(err => {
      dispatch({
        type: actions.FETCH_RESERVATION_FAILURE,
        error: err
      });
    });
  };
};
