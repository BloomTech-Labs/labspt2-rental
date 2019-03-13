import { connect } from 'react-redux';
import { registerUser } from './actionCreator';
import Dashboard from './Dashboard';

const mapStateToProps = ({ registration }) => ({
  registration
})

const mapDispatchToProps = () => ({
  registerUser
})

export default connect(mapStateToProps, {registerUser})(Dashboard)