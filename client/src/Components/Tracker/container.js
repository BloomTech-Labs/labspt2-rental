import { connect } from 'react-redux';
import Tracker from './Tracker';
import { fetchReservationInfo } from './actionCreators';

const mapStateToProps = ({ tracker }) => ({
    tracker,
})

const mapDispatchToProps = ({
    fetchReservationInfo
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tracker)