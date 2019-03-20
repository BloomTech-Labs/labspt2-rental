import { connect } from "react-redux";
import PropertyList from "./PropertyList";

const mapStateToProps = ({ propertyList }) => ({ propertyList });

export default connect(mapStateToProps)(PropertyList);
