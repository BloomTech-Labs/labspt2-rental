import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const registerUser = newUser => {
  return async dispatch => {
    dispatch({ type: actions.REGISTER_USER_STARTED });
    try {
      const token = await axios.post(
        `${config.apiUrl}/api/users/register`,
        newUser
      );
      dispatch({
        type: actions.REGISTER_USER_SUCCESS,
        payload: "Bearer " + token
      });
    } catch (err) {
      console.log("inside of catch");
      console.error(err);
      dispatch({ type: actions.REIGSTER_USER_FAILURE, payload: err });
    }
  };
};

export const getEverything = () => dispatch => {
  function getCounts(database, filter) {
    return axios.get(
      `${config.apiUrl}/api/${database}/count?filter=${JSON.stringify(filter) ||
        ""}`
    );
  }

  const rightNow = new Date();
  const today = new Date(
    rightNow
      .toISOString()
      .slice(0, 10)
      .concat("T00:00:00.000Z")
  );
  const tomorrow = new Date(Date.parse(today) + 86400000);

  axios
    .all([
      getCounts("reservations", { checkOut: { $gte: today } }),
      getCounts("reservations", {
        $and: [{ checkOut: { $gte: today } }, { checkIn: { $lte: today } }]
      }),
      getCounts("properties"),
      // getCounts("properties", "filter"),
      getCounts("employees", { role: "employee" }),
      getCounts("tasks", {
        $and: [{ endDate: { $gte: today } }, { endDate: { $lte: tomorrow } }]
      }),
      getCounts("tasks", { endDate: { $lte: today } })
    ])
    .then(
      axios.spread((
        reservTotals,
        reservActive,
        propTotal,
        // propInactive,
        emplTotal,
        tasksToday,
        tasksOverdue
      ) => {
        const result = {
          reservTotals: reservTotals.data.count,
          reservActive: reservActive.data.count,
          propTotal: propTotal.data.count,
          emplTotal: emplTotal.data.count,
          tasksToday: tasksToday.data.count,
          tasksOverdue: tasksOverdue.data.count
        };
        dispatch({type: actions.COUNTS_SUCCESS, payload: result})
      })
    )
    .catch(err => {
      console.log("Warning!:", err)
    });
};
