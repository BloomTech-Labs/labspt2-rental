import { connect } from "react-redux";
import {
  getReservations,
  searchReservations,
  createReservation
} from "./actionCreator";
import Reservations from "./Reservations";
import ReservationAdd from "./ReservationAdd";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ reservations, properties, employees }) => ({
  reservations: reservations.reservations,
  properties: properties.properties,
  employees: employees.employees,
  loading: reservations.loading,
  error: reservations.error
});

const connector = connect(
  mapStateToProps,
  {
    getReservations,
    searchReservations,
    createReservation
  }
);

export const ReservationsWithData = connector(withRouter(Reservations));
export const ReservationAddWithData = connector(withRouter(ReservationAdd));
