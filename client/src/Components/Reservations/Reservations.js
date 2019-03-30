import React from "react";
import { Switch, Route } from "react-router-dom";
import ReservationsHome from "./ReservationsHome";
import ReservationsAdd from "./ReservationAdd";

export default props => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard/reservations"
          render={() => <ReservationsHome {...props} />}
        />
        <Route
          path="/dashboard/reservations/add"
          render={() => <ReservationsAdd {...props} />}
        />
      </Switch>
    </>
  );
};
