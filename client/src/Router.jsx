import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Registration } from "./Components/Registration";
import { LoginPage } from "./Components/LoginPage";
import { Dashboard } from "./Components/Dashboard";
import { Home } from "./Components/LandingPage";
import { NotFound } from "./Components/shared/404 Not Found/404";
import { ResetPass, ForgotPass } from "./Components/PasswordReset";
import { FirstLogin, NewUserUpdate } from "./Components/Welcome";
import axios from "axios";

const Router = () => {
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthorized = () => {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("authToken") || null;
      /*if setting null does not remove `Authorization` header then try
          delete axios.defaults.headers.common['Authorization'];
        */
      return Boolean(localStorage.getItem("authToken"));
    };

    return (
      <Route
        {...rest}
        render={props =>
          isAuthorized() ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  return (
    <Fragment>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/forgot" component={ForgotPass} />
        <Route path="/forgot/:token" component={ResetPass} />
        <Route exact path="/welcome" component={FirstLogin} />
        <ProtectedRoute path="/welcome/update" component={NewUserUpdate} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Router;
