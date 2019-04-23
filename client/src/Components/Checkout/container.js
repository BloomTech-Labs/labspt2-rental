import { connect } from "react-redux";
import { getReservation, checkout } from "./actionCreator";
import { withRouter } from "react-router-dom";
import Checkout from "./Checkout.jsx";

const mapStateToProps = ({ checkout }) => ({
  loading: checkout.loading,
  error: checkout.error,
  reservation: checkout.reservation,
  property: checkout.property,
  employee: checkout.employee
});

const connector = connect(
  mapStateToProps,
  {
    getReservation,
    checkout
  }
);

export const CheckoutCart = connector(withRouter(Checkout));
