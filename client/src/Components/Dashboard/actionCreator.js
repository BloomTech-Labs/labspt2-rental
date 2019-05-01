import axios from "axios";
import * as actions from "./actions";
import config from "config";

const dashboardEmployees = [];

export const getEverything = () => dispatch => {
  dispatch({ type: actions.COUNTS_STARTED });
  function getCounts(database, filter) {
    return axios.get(
      `${config.apiUrl}/api/${database}/count?filter=${JSON.stringify(filter) ||
        ""}`
    );
  }

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
        $and: [{ checkIn: { $gte: nextWeek } }]
      })}`
    );
  }

  function getEmployees() {
    return axios.get(`${config.apiUrl}/api/employees/`);
  }

  function getProperties() {
    return axios.get(`${config.apiUrl}/api/properties`);
  }

  // fetches the tasks of an employee by their id
  function getEmployeeTasks(id) {
    return axios.get(
      `${config.apiUrl}/api/tasks?filter=${JSON.stringify({
        assignedTo: { $in: [id] }
      })}`
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
      getEmployees()
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
          allReservations,
          employees
        ) => {
          const activeReservArr = activeReservations.data.data;
          const propertiesTotal = properties.data.data.length;
          const uniqueIds = [];
          let propertiesWithoutFutureGuests = [];

          for (let i = 0; i < 3; i++) {
            if (employees.data.data[i]) {
              dashboardEmployees.push(employees.data.data[i]._id);
            }
          }

          properties.data.data.forEach(item =>
            propertiesWithoutFutureGuests.push(item._id)
          );

          activeReservArr.forEach(item => {
            if (!uniqueIds.includes(item.property._id)) {
              uniqueIds.push(item.property._id);
            }
          });

          allReservations.data.data.forEach(item => {
            if (propertiesWithoutFutureGuests.includes(item.property._id)) {
              propertiesWithoutFutureGuests = propertiesWithoutFutureGuests.filter(
                propertyID => propertyID !== item.property._id
              );
            }
          });

          const propertiesWithoutReservations = properties.data.data.filter(
            item => {
              return propertiesWithoutFutureGuests.includes(item._id);
            }
          );

          let result = {
            reservTotals: reservTotals.data.count,
            reservActive: activeReservArr.length,
            propTotal: propertiesTotal,
            propInactive: propertiesTotal - uniqueIds.length,
            emplTotal: emplTotal.data.count,
            tasksToday: tasksToday.data.count,
            tasksOverdue: tasksOverdue.data.count,
            propertiesWithoutReservations: propertiesWithoutReservations,
            employees: employees.data.data
          };

          // checks for how many dashboard employees in array
          // based on number, fetches tasks and sends to redux store an object with their tasks for rending on employee list in dashboard
          if (dashboardEmployees.length === 0) {
            result = { ...result, employeeTasks: 0 };
          } else if (dashboardEmployees.length === 1) {
            axios
              .all([getEmployeeTasks(dashboardEmployees[0])])
              .then(response => {
                let employeeTasksObject = {
                  employee0: response[0].data.data
                };
                result = { ...result, employeeTasks: employeeTasksObject };
                dispatch({ type: actions.COUNTS_SUCCESS, payload: result });
              });
          } else if (dashboardEmployees.length === 2) {
            axios
              .all([
                getEmployeeTasks(dashboardEmployees[0]),
                getEmployeeTasks(dashboardEmployees[1])
              ])
              .then(
                axios.spread((employee0, employee1) => {
                  let employeeTasksObject = {
                    employee0: employee0.data.data,
                    employee1: employee1.data.data
                  };
                  result = { ...result, employeeTasks: employeeTasksObject };
                  dispatch({ type: actions.COUNTS_SUCCESS, payload: result });
                })
              );
          } else {
            axios
              .all([
                getEmployeeTasks(dashboardEmployees[0]),
                getEmployeeTasks(dashboardEmployees[1]),
                getEmployeeTasks(dashboardEmployees[2])
              ])
              .then(
                axios.spread((employee0, employee1, employee2) => {
                  let employeeTasksObject = {
                    employee0: employee0.data.data,
                    employee1: employee1.data.data,
                    employee2: employee2.data.data
                  };
                  result = { ...result, employeeTasks: employeeTasksObject };
                  dispatch({ type: actions.COUNTS_SUCCESS, payload: result });
                })
              );
          }
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
