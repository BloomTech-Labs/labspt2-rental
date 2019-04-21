import { connect } from 'react-redux';
import { getReservation, getEmployee, getProperty } from './actionCreator';
import { withRouter } from "react-router-dom";
import Checkout from './Checkout.jsx';

const mapStateToProps = ({checkout}) => ({
    loading: checkout.loading,
    error: checkout.error,
    reservation: checkout.reservation,
    property: checkout.property,
    employee: checkout.employee
});

const connector = connect(
    mapStateToProps,
    {
        getEmployee, 
        getReservation,
        getProperty
    }
)

export const CheckoutCart = connector(withRouter(Checkout));