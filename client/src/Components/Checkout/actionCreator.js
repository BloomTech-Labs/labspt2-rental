import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

// Checkout info required 
// Guest: First & Last Name, email, phone number.
// Property: name, address, employee, Cleaning Fee
// Reservation: Check in, Check out, Nights, Guests, Paid status, Booking ID

export const getReservation = reservationID => {
    return async dispatch => {
      dispatch({ type: actions.FETCH_RESERVATION_STARTED });
      try {
        const reservation = await axios.get(`${config.apiUrl}/api/reservations/${reservationID}`);
        dispatch({
          type: actions.FETCH_RESERVATION_SUCCESS,
          payload: reservation.data.data
        });
      } catch (err) {
        console.error(err);
        dispatch({ type: actions.FETCH_RESERVATION_ERROR, payload: err.message });
      }
    };
};

export const getEmployee = employeeID => {
    return async dispatch => {
        dispatch({ type: actions.FETCH_EMPLOYEE_STARTED });
        try{
            const employee = await axios.get(`${config.apiUrl}/api/employees/${employeeID}`);
            dispatch({
                type: actions.FETCH_EMPLOYEE_SUCCESS,
                payload: employee.data.data
            })
        } catch (err) {
            console.error(err);
            dispatch({ type: actions.FETCH_EMPLOYEE_ERROR, payload: err });
        }
    }
};

export const getProperty = propertyID => {
    return async dispatch => {
        dispatch({ type: actions.CHECKOUT_PROPERTY_STARTED });
        try{
            const property = await axios.get(`${config.apiUrl}/api/properties/${propertyID}`);
            dispatch({
                type: actions.CHECKOUT_PROPERTY_SUCCESS,
                payload: property.data.data
            })
        } catch (err) {
            console.error(err);
            dispatch({ type: actions.CHECKOUT_PROPERTY_ERROR, payload: err });
        }
    }
};

export const checkout = (token, amount, reservationID) => {
    return async dispatch => {
      dispatch({ type: actions.CHECKOUT_STARTED });
      try {
        const payment = await axios.post(
          `${config.apiUrl}/api/stripe/charge`,
          {token: token, amount: amount, reservationID: reservationID}
        );
        dispatch({
          type: actions.CHECKOUT_SUCCESS,
          payload: payment
        });
        return payment.status
      } catch (err) {
        console.error(err);
        dispatch({ type: actions.CHECKOUT_ERROR, payload: err });
      }
    };
};