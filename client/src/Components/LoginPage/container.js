import { connect } from 'react-redux';
import { loginUser } from './actions';
import LoginPage from './LoginPage';

const mapStateToProps = ({ login }) => ({
    login
})

const mapDispatchToProps = () => ({
    loginUser
})

export default connect(mapStateToProps, { loginUser })(LoginPage)