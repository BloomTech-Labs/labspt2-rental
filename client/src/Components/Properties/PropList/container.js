import { connect } from "react-redux";
import { getProperties } from "./actionCreator";
import Properties from "./Properties";

const mapStateToProps = data => ({
  properties: data.properties.properties,
  loading: data.properties.loading,
  error: data.properties.error
});

export default connect(
  mapStateToProps,
  { getProperties }
)(Properties);
