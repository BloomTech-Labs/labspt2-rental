import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

// Checkout info required 
// Guest: First & Last Name, email, phone number.
// Property: name, address, employee, Cleaning Fee
// Reservation: Check in, Check out, Nights, Guests, Paid status, Booking ID

export const getReservation = reservationID => {
    return async dispatch => {
      dispatch({ type: actions.RESERVATION_STARTED });
      try {
        // const reservation = await axios.get(`${config.apiUrl}/api/reservations/get/${reservationID}`);
        const reservation = await axios.get(`${config.apiUrl}/api/reservations/5cbb572a0806ea4653dd75cc`);
        dispatch({
          type: actions.RESERVATION_SUCCESS,
          payload: reservation.data.data
        });
      } catch (err) {
        console.error(err);
        dispatch({ type: actions.RESERVATION_ERROR, payload: err });
      }
    };
  };

export const getEmployee = employeeID => {
    return async dispatch => {
        dispatch({ type: actions.EMPLOYEE_STARTED });
        try{
            const employee = await axios.get(`${config.apiUrl}/api/employees/${employeeID}`);
            dispatch({
                type: actions.EMPLOYEE_SUCCESS,
                payload: employee.data.data
            })
        } catch (err) {
            console.error(err);
            dispatch({ type: actions.EMPLOYEE_ERROR, payload: err });
        }
    }
}