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

  function getActiveReservations() {
    return axios.get(`${config.apiUrl}/api/reservations?filter=${JSON.stringify({
      $and: [{ checkOut: { $gte: today } }, { checkIn: { $lte: today } }]
    })}`)
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
      getCounts("properties"),
      getCounts("employees", { role: "employee" }),
      getCounts("tasks", {
        $and: [{ endDate: { $gte: today } }, { endDate: { $lte: tomorrow } }]
      }),
      getCounts("tasks", { endDate: { $lte: today } }),
      getActiveReservations()
    ])
    .then(
      axios.spread((
        reservTotals,
        propTotal,
        emplTotal,
        tasksToday,
        tasksOverdue,
        activeReservations
      ) => {
        const activeReservArr = activeReservations.data.data
        console.log(activeReservArr)
        const uniqueIds = [];
        activeReservArr.forEach(item => {
          if (!uniqueIds.includes(item.property._id)) {
            uniqueIds.push(item.property._id)
          }
        })
        const result = {
          reservTotals: reservTotals.data.count,
          reservActive: activeReservArr.length,
          propTotal: propTotal.data.count,
          propInactive: propTotal.data.count - uniqueIds.length,
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
