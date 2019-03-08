import { connect } from "react-redux";
import UserList from "./UserList";

const mapStateToProps = ({ userList }) => ({ userList });

export default connect(mapStateToProps)(UserList);
