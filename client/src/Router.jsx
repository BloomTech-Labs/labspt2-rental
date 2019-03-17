import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Registration } from './Components/Registration';
import { LoginPage } from './Components/LoginPage';
import { UserList } from "./Components/UserList";
import { Dashboard} from './Components/Dashboard';
import axios from "axios";
import { store } from "./Redux/store";

const Router = () => {
  (() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      axios.defaults.headers.common['Authorization'] = null;
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
      </Switch>
    </Fragment>
  )
}

export default Router;
