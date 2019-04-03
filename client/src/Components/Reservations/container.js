import { connect } from "react-redux";
import {
  getReservations,
  searchReservations,
  createReservation,
  fetchProperties,
  fetchEmployees
} from "./actionCreator";
import _ReservationView from "./ReservationView";
import _Reservations from "./Reservations";
import _ReservationAdd from "./ReservationAdd";
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
    fetchProperties,
    fetchEmployees,
    searchReservations,
    createReservation
  }
);

export const Reservations = connector(withRouter(_Reservations));
export const ReservationView = connector(withRouter(_ReservationView));
export const ReservationAdd = connector(withRouter(_ReservationAdd));
