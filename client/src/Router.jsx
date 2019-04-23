import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Registration } from "./Components/Registration";
import { LoginPage } from "./Components/LoginPage";
import { UserList } from "./Components/UserList";
import { Dashboard } from "./Components/Dashboard";
import { Properties } from "./Components/Properties";
import { Home } from "./Components/LandingPage";

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
  const token = localStorage.getItem("authToken");
  let block = true;
  if (token) {
    block = false;
  } else {
    block = true;
  }
  return (
    <Fragment>
      <Switch>
        {/* <Route exact path="/dashboard" render={() => (block ? (<Redirect to="/login"/>) : (<Dashboard/>) )}/> */}
        <Route path="/register" component={Registration} />
        <Route path="/users" component={UserList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/properties" component={Properties} />
        <Route path="/" component={Home} />
      </Switch>
    </Fragment>
  );
};

export default Router;

{/* <Switch>
<ProtectedRoute
  exact
  path="/dashboard"
  component={DashboardView}
/>
<Route path="/login" component={LoginView} />
<ProtectedRoute
  path="/results/:username"
  component={SearchResult}
/>
<Redirect exact from="/" to="/login" />
<Route component={NotFound} />
</Switch> */}

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const token = localStorage.getItem('token');
    
//     const checkAuth = () => {
//         axios.get('url', {
//             headers: {
//                 authorization: `bearer ${token}`
//             }
//         }) //a restricted route that verifies the token is good. a simple res.status 200 would work
//         .then(res => {
//             if (res.status !== 401) {
//                 return true;
//             }
//             return false
//         }).catch(err => {
//             return false;
//         })
//     }

//     return (
//         <Route
//           render={props =>
//             token /*or checkAuth()*/ ? <Component {...props} /> : <Redirect to="/login" />
//           }
//           {...rest}
//         />
//     )
//     };

    // render={ async props => {
    //   authorized = await checkAuth()
    //   authorized ?
    //   <Component {...props} :
    //   <Redirect />
    //   }}