import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Registration } from "./Components/Registration";
import { UserList } from "./Components/UserList";

const Router = () => (
  <Fragment>
    <Switch>
      <Route path="/register" component={Registration} />
      <Route path="/users" component={UserList} />
    </Switch>
  </Fragment>
);

export default Router;
