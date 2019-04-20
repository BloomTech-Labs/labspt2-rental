import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

// Checkout info required 
// Guest: First & Last Name, email, phone number.
// Property: name, address, employee, Cleaning Fee
// Reservation: Check in, Check out, Nights, Guests, Paid status, Booking ID

export const getReservation = reservationID => {
    console.log('reservation id passed', reservationID);
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
}