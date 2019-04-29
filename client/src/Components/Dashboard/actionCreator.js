import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getEverything = () => dispatch => {
  function getCounts(database, filter) {
    return axios.get(
      `${config.apiUrl}/api/${database}/count?filter=${JSON.stringify(filter) ||
        ""}`
    );
  }


// createdAt: "2019-04-27T07:00:17.238Z"
// createdBy: "5cc3fe009b6f68266b721621"
// email: "employee@roostr.io"
// firstName: "Fredy"
// image: "jidkfcrf00eivzefi8ot"
// lastName: "Denesik"
// permissions: {_id: "5cc3fe019b6f68266b721624", task: true, property: true, checkout: true}
// role: "employee"
// updatedAt: "2019-04-27T07:00:17.238Z"
// username: "test_employee"
// __v: 0
// _id: "5cc3fe019b6f68266b721623"

// active: true
// address1: "929 Vicente Coves"
// assistants: [{…}]
// city: "Port Ronstad"
// cleaningFee: 94
// createdAt: "2019-04-27T07:00:17.273Z"
// createdBy: {billingAddress: {…}, _id: "5cc3fe009b6f68266b721621", role: "owner", username: "test_owner", password: "$2b$08$oCVj.4Pf9QOn3GNlo/VmKuiNzXAOM2dTYqT1xppPXO7OWMYF/xGWi", …}
// image: "u2xnww5ptxrsr2qqfiz3"
// name: "House 1"
// occupants: 5
// price: 206
// state: "New York"
// updatedAt: "2019-04-27T07:00:17.273Z"
// zip: "86680-1174"
// __v: 0
// _id: "5cc3fe019b6f68266b721625"

  function getActiveReservations() {
    return axios.get(
      `${config.apiUrl}/api/reservations?filter=${JSON.stringify({
        $and: [{ checkOut: { $gte: today } }, { checkIn: { $lte: today } }]
      })}`
    );
  }

  function getAllReservations() {
    return axios.get(
      `${config.apiUrl}/api/reservations?filter=${JSON.stringify({ 
        $and: [{ checkIn: { $gte: nextWeek } } ]
      })}`
    )
  }

  function getProperties (){
    return axios.get(
      `${config.apiUrl}/api/properties`
    )
  };

  const rightNow = new Date();
  const today = new Date(
    rightNow
      .toISOString()
      .slice(0, 10)
      .concat("T00:00:00.000Z")
  );
  const tomorrow = new Date(Date.parse(today) + 86400000);
  const nextWeek = new Date(Date.parse(tomorrow) + 518400000);

  axios
    .all([
      getCounts("reservations", { checkOut: { $gte: today } }),
      getCounts("employees", { role: "employee" }),
      getCounts("tasks", {
        $and: [{ endDate: { $gte: today } }, { endDate: { $lte: tomorrow } }]
      }),
      getCounts("tasks", { endDate: { $lte: today } }),
      getActiveReservations(),
      getProperties(),
      getAllReservations(),
    ])
    .then(
      axios.spread(
        (
          reservTotals,
          emplTotal,
          tasksToday,
          tasksOverdue,
          activeReservations,
          properties,
          allReservations
        ) => {
          const activeReservArr = activeReservations.data.data;
          const propertiesTotal = properties.data.data.length;
          const uniqueIds = [];
          let propertiesWithoutFutureGuests = [];

          properties.data.data.forEach(item => propertiesWithoutFutureGuests.push(item._id));

          activeReservArr.forEach(item => {
            if (!uniqueIds.includes(item.property._id)) {
              uniqueIds.push(item.property._id);
            }
          });

          allReservations.data.data.forEach( item => {
            if (propertiesWithoutFutureGuests.includes(item.property._id)){
              propertiesWithoutFutureGuests = propertiesWithoutFutureGuests.filter(propertyID => propertyID !== item.property._id)
            }
          })

          const propertiesWithoutReservations = properties.data.data.filter(item => {
            return propertiesWithoutFutureGuests.includes(item._id)
          })

          const result = {
            reservTotals: reservTotals.data.count,
            reservActive: activeReservArr.length,
            propTotal: propertiesTotal,
            propInactive: propertiesTotal - uniqueIds.length,
            emplTotal: emplTotal.data.count,
            tasksToday: tasksToday.data.count,
            tasksOverdue: tasksOverdue.data.count,
            propertiesWithoutReservations: propertiesWithoutReservations
          };
          dispatch({ type: actions.COUNTS_SUCCESS, payload: result });
        }
      )
    )
    .catch(err => {
      console.log("Warning!:", err);
    });
};

export const getUserRole = () => dispatch => {
  return axios
    .get(`${config.apiUrl}/api/users/me`)
    .then(data => {
      dispatch({
        type: actions.USER_ROLE_SUCCESS,
        payload: data.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const dashboardGetEmployees = () => dispatch => {
  dispatch({ type: actions.DASHBOARD_FETCH_EMPLOYEES_STARTED });
  return axios
    .get(`${config.apiUrl}/api/employees/`)
    .then(response => {
      dispatch({ type: actions.DASHBOARD_FETCH_EMPLOYEES_SUCCESS, payload: response.data.data });
    })
    .catch(err => {
      dispatch({ type: actions.DASHBOARD_FETCH_EMPLOYEES_FAILURE, payload: err });
    });
};