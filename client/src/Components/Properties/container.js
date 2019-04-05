import { connect } from "react-redux";
import { getProperties, getProperty } from "./actionCreator";
import _Properties from "./Properties";
import _Property from "./Property";
import { withRouter } from "react-router-dom";

const mapStateToProps = data => ({
  properties: data.properties.properties,
  loading: data.properties.loading,
  error: data.properties.error,
  property: data.property
});

const connector = connect(
  mapStateToProps,
  { getProperties, getProperty }
);

export const Properties = connector(withRouter(_Properties));
export const Property = connector(withRouter(_Property));
