import { connect } from "react-redux";
import * as actions from "./actionCreator";
import _ReservationEdit from "./ReservationEdit";
import _ReservationView from "./ReservationView";
import _Reservations from "./Reservations";
import _ReservationAdd from "./ReservationAdd";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ reservations }) => ({
  reservations: reservations.reservations,
  reservation: reservations.reservation,
  properties: reservations.properties,
  employees: reservations.employees,
  loading: reservations.loading,
  error: reservations.error,
  reservationCount: reservations.reservationCount,
  property: reservations.property
});

const connector = connect(
  mapStateToProps,
  {
    ...actions
  }
);

export const Reservations = connector(withRouter(_Reservations));
export const ReservationView = connector(withRouter(_ReservationView));
export const ReservationEdit = connector(withRouter(_ReservationEdit));
export const ReservationAdd = connector(withRouter(_ReservationAdd));
