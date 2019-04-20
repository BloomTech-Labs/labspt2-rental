import { connect } from 'react-redux';
import { getReservation, getEmployee } from './actionCreator';
import Checkout from './Checkout';

const mapStateToProps = ({checkout}) => ({
    loading: checkout.loading,
    error: checkout.error,
    reservation: checkout.reservation,
    property: checkout.property,
    employee: checkout.employee
});

export default connect(
    mapStateToProps,
    { getReservation, getEmployee }
)(Checkout);