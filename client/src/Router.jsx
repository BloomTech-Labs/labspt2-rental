import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Registration } from './Components/Registration';

const Router = () => (
  <Fragment>
    <Switch>
      <Route path="/register" component={Registration} />
    </Switch>
  </Fragment>
)

export default Router;