import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Registration } from './Components/Registration';
import { LoginPage } from './Components/LoginPage';
import { Dashboard} from './Components/Dashboard';

const Router = () => (
  <Fragment>
    <Switch>
      <Route path="/register" component={Registration} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Fragment>
)

export default Router;