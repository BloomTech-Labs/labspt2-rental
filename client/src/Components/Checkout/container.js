import { connect } from "ract-redux";
import { getReservation } from "./actionCreator";
import Checkout from "./Checkout";

const mapStateToProps = data => ({
  reservation: data.reservation,
  loading: data.loading,
  error: data.error
});

export default connect(
  mapStateToProps,
  { getReservation }
)(Checkout);
