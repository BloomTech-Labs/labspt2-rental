import { connect } from "react-redux";
import { getProperties } from "./actionCreator";
import Properties from "./Properties";

const mapStateToProps = ({ properties }) => ({
  properties: properties.properties
});

export default connect(
  mapStateToProps,
  { getProperties }
)(Properties);
