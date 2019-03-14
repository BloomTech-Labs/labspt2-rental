import { connect } from "react-redux";
import TopNav from "./UserList";

const mapStateToProps = ({ topNav }) => ({ topNav });

export default connect(mapStateToProps)(TopNav);
