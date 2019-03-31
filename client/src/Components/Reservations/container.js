import { connect } from "react-redux";
import {
  getReservations,
  searchReservations,
  fetchProperties,
  fetchEmployees,
  createReservation
} from "./actionCreator";
import Reservations from "./Reservations";
import ReservationAdd from "./ReservationAdd";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ reservations }) => ({
  reservations: reservations.reservations,
  properties: reservations.properties,
  employees: reservations.employees,
  loading: reservations.loading,
  error: reservations.error
});

const connector = connect(
  mapStateToProps,
  {
    getReservations,
    searchReservations,
    fetchProperties,
    fetchEmployees,
    createReservation
  }
);

export const ReservationsWithData = connector(withRouter(Reservations));
export const ReservationAddWithData = connector(withRouter(ReservationAdd));
