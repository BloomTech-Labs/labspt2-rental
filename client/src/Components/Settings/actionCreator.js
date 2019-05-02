import axios from "axios";
import * as actions from "./actions";
import config from "../../config/index";

export const getUser = user => {
  return async dispatch => {
    dispatch({ type: actions.STRIPE_USER_STARTED });
    try {
      const user = await axios.get(`${config.apiUrl}/api/users/me`);
      dispatch({
        type: actions.STRIPE_USER_SUCCESS,
        payload: user.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.STRIPE_USER_ERROR, payload: err });
    }
  };
};

export const updateUser = user => {
  return async dispatch => {
    dispatch({ type: actions.STRIPE_USER_STARTED });
    try {
      const updatedUser = await axios.put(
        `${config.apiUrl}/api/users/me`,
        user
      );
      dispatch({
        type: actions.STRIPE_USER_SUCCESS,
        payload: updatedUser.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.STRIPE_USER_ERROR, payload: err });
    }
  };
};

export const updatePassword = password => {
  return async dispatch => {
    dispatch({ type: actions.STRIPE_USER_STARTED });
    try {
      const updatedPassword = await axios.put(
        `${config.apiUrl}/api/users/me/pass`,
        password
      );
      dispatch({
        type: actions.STRIPE_USER_SUCCESS,
        payload: updatedPassword.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.STRIPE_USER_ERROR, payload: err });
    }
  };
};

export const updateCC = updatedCC => {
  return async dispatch => {
    dispatch({ type: actions.STRIPE_USER_STARTED });
    try {
      const user = await axios.post(
        `${config.apiUrl}/api/stripe/updateCC`,
        updatedCC
      );
      dispatch({
        type: actions.STRIPE_USER_SUCCESS,
        payload: user.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.STRIPE_USER_ERROR, payload: err });
    }
  };
};

// Fetching properties to access number of properties on user's account for updating Stripe billing subscription
export const getProperties = () => {
  return async dispatch => {
    dispatch({
      type: actions.STRIPE_PROPERTY_STARTED
    });
    try {
      const propertiesFetched = await axios.get(
        `${config.apiUrl}/api/properties`
      );
      dispatch({
        type: actions.STRIPE_PROPERTIES_SUCCESS,
        payload: propertiesFetched.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.STRIPE_PROPERTY_FAILURE, payload: err });
    }
  };
};

export const getSubscription = (subscriptionID) => {
  return async dispatch => {
    dispatch({
      type: actions.STRIPE_FETCH_SUBSCRIPTION_STARTED
    });
    try {
      const subscription = await axios.get(
        `${config.apiUrl}/api/stripe/subscription`, 
        subscriptionID
      );
      dispatch({
        type: actions.STRIPE_FETCH_SUBSCRIPTION_SUCCESS,
        payload: subscription.data.data
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: actions.STRIPE_FETCH_SUBSCRIPTION_ERROR, payload: err });
    }
  };
};