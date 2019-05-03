import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

export const getReservation = reservationID => {
  return async dispatch => {
    dispatch({ type: actions.FETCH_RESERVATION_STARTED });
    try {
      const reservation = await axios.get(
        `${config.apiUrl}/api/reservations/${reservationID}`
      );
      dispatch({
        type: actions.FETCH_RESERVATION_SUCCESS,
        payload: reservation.data.data
      });
    } catch (err) {
      dispatch({ type: actions.FETCH_RESERVATION_ERROR, payload: err.message });
    }
  };
};

export const checkout = (token, amount, reservationID) => {
  return async dispatch => {
    dispatch({ type: actions.CHECKOUT_STARTED });
    try {
      const payment = await axios.post(`${config.apiUrl}/api/stripe/charge`, {
        token: token,
        amount: amount,
        reservationID: reservationID
      });
      dispatch({
        type: actions.CHECKOUT_SUCCESS,
        payload: payment
      });
      return payment.status;
    } catch (err) {
      dispatch({ type: actions.CHECKOUT_ERROR, payload: err });
    }
  };
};
