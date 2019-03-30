import { connect } from "react-redux";
import {
  getReservations,
  searchReservations,
  fetchProperties,
  fetchEmployees
} from "./actionCreator";
import Reservations from "./Reservations";

const mapStateToProps = ({ reservations }) => ({
  reservations: reservations.reservations,
  properties: reservations.properties,
  employees: reservations.employees,
  loading: reservations.loading,
  error: reservations.error
});

export default connect(
  mapStateToProps,
  { getReservations, searchReservations, fetchProperties, fetchEmployees }
)(Reservations);
