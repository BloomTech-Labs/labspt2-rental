import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Registration } from "./Components/Registration";
import { LoginPage } from "./Components/LoginPage";
import { UserList } from "./Components/UserList";
import { Dashboard } from "./Components/Dashboard";
<<<<<<< Updated upstream
import { Properties } from "./Components/Properties";
import { Home } from "./Components/LandingPage";
=======
import { Properties } from "./Components/Properties/PropList";
import { Home } from './Components/LandingPage';
import { TrackingPage } from './Components/Tracker';
>>>>>>> Stashed changes

import axios from "axios";

const Router = () => {
  (() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
      /*if setting null does not remove `Authorization` header then try
        delete axios.defaults.headers.common['Authorization'];
      */
    }
  })();

  return (
    <Fragment>
      <Switch>
        <Route path="/register" component={Registration} />
        <Route path="/users" component={UserList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/properties" component={Properties} />
        <Route path="/guest/:id" component={TrackingPage} />
        <Route path="/" component={Home} />
      </Switch>
    </Fragment>
  );
};

export default Router;
