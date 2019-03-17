import { connect } from "react-redux";
import { getReservations } from "./actionCreator";
import Reservations from "./Reservations";

const mapStateToProps = ({ loading, error, reservations }) => ({
  loading,
  error,
  reservations
});

export default connect(
  mapStateToProps,
  { getReservations }
)(Reservations);
