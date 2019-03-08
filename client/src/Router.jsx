import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Registration } from './Components/Registration';
import { LoginPage } from './Components/LoginPage';

const Router = () => (
  <Fragment>
    <Switch>
      <Route path="/register" component={Registration} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </Fragment>
)

export default Router;