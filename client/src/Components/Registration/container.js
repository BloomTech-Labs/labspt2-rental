import { connect } from 'react-redux';
import RegistrationPage from './RegistrationPage'

const mapStateToProps = ({ registration }) => ({
  registration
})

export default connect(mapStateToProps)(RegistrationPage)