import { connect } from "react-redux";
import Properties from "./Properties";

const mapStateToProps = ({ properties }) => ({ properties });

export default connect(mapStateToProps)(Properties);
