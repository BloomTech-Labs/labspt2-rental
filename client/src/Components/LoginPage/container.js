import { connect } from 'react-redux';
import LoginPage from './LoginPage';

const mapStateToProps = ({ login }) => ({
    login
})

export default connect(mapStateToProps)(LoginPage)