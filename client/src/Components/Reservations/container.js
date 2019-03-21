import { connect } from "react-redux";
import { getReservations, searchReservations } from "./actionCreator";
import Reservations from "./Reservations";

const mapStateToProps = ({ reservations }) => ({
  reservations: reservations.reservations,
  loading: reservations.loading,
  error: reservations.error
});

export default connect(
  mapStateToProps,
  { getReservations, searchReservations }
)(Reservations);
