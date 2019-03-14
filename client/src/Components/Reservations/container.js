import { connect } from 'react-redux';
import { registerUser } from './actionCreator';
import Reservations from './Reservations';

const mapStateToProps = ({ registration }) => ({
  registration
})

const mapDispatchToProps = () => ({
  registerUser
})

export default connect(mapStateToProps, {registerUser})(Reservations)