import { connect } from 'react-redux';
import { getReservation, getEmployee } from './actionCreator';
import { withRouter } from "react-router-dom";
import Checkout from './Checkout';

const mapStateToProps = ({checkout}) => ({
    loading: checkout.loading,
    error: checkout.error,
    reservation: checkout.reservation,
    property: checkout.property,
    employee: checkout.employee
});

// export default connect(
//     mapStateToProps,
//     { getReservation, getEmployee }
// )(Checkout);

const connector = connect(
    mapStateToProps,
    {
        getEmployee, 
        getReservation
    }
)

export const CheckoutCart = connector(withRouter(Checkout))