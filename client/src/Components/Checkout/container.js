import { connect } from 'react-redux';
import {} from './actionCreator';
import Checkout from './Checkout';

const mapStateToProps = () => ({
    // props you need
});

export default connect(
    mapStateToProps,
    // { functions }
)(Checkout);