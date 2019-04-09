import { connect } from "react-redux";
import {
  getProperties,
  getProperty,
  updateProperty,
  addProperty,
  getEmployees
} from "./actionCreator";
import _Properties from "./Properties";
import _Property from "./Property";
import _PropertyEdit from "./PropertyEdit";
import _PropertyAdd from "./PropertyAdd";
import { withRouter } from "react-router-dom";

const mapStateToProps = data => ({
  properties: data.properties.properties,
  loading: data.properties.loading,
  error: data.properties.error,
  property: data.property,
  employees: data.employees
});

const connector = connect(
  mapStateToProps,
  { getProperties, getProperty, updateProperty, addProperty, getEmployees }
);

export const Properties = connector(withRouter(_Properties));
export const Property = connector(withRouter(_Property));
export const PropertyEdit = connector(withRouter(_PropertyEdit));
export const PropertyAdd = connector(withRouter(_PropertyAdd));
