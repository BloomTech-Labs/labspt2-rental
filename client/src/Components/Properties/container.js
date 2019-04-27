import { connect } from "react-redux";
import {
  getProperties,
  getProperty,
  updateProperty,
  addProperty,
  getEmployees,
  getReservations,
  deleteProperty,
  getUser,
  getTasks,
  deleteTasks,
  searchProperties,
  fetchPropertyCount
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
  property: data.properties.property,
  employees: data.properties.employees,
  reservations: data.properties.reservations,
  user: data.properties.user,
  tasks: data.properties.tasks,
  propertyCount: data.properties.propertyCount
});

const connector = connect(
  mapStateToProps,
  {
    getTasks,
    deleteTasks,
    getProperties,
    getProperty,
    updateProperty,
    addProperty,
    getEmployees,
    getReservations,
    deleteProperty,
    getUser,
    searchProperties,
    fetchPropertyCount
  }
);

export const Properties = connector(withRouter(_Properties));
export const Property = connector(withRouter(_Property));
export const PropertyEdit = connector(withRouter(_PropertyEdit));
export const PropertyAdd = connector(withRouter(_PropertyAdd));
