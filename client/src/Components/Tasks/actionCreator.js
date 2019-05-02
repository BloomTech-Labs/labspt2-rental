import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getTasks = (filterSort = {}) => {
  const { filter, sort, page, pageSize } = filterSort;

  return dispatch => {
    dispatch({
      type: actions.FETCH_TASK_ATTEMPT
    });
    axios
      .get(
        `${config.apiUrl}/api/tasks?filter=${JSON.stringify(filter) ||
          ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
      )
      .then(response => {
        dispatch({
          type: actions.FETCH_TASK_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.FETCH_TASK_FAILURE,
          error: err
        });
      });
  };
};

export const searchTasks = (filterSort = {}) => {
  const { filter, sort, page, pageSize, search } = filterSort;

  return dispatch => {
    dispatch({
      type: actions.FETCH_TASK_ATTEMPT
    });
    axios
      .get(
        `${config.apiUrl}/api/tasks/search?search=${search ||
          ""}&filter=${JSON.stringify(filter) ||
          ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
      )
      .then(response => {
        dispatch({
          type: actions.FETCH_TASK_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actions.FETCH_TASK_FAILURE,
          error: err
        });
      });
  };
};

// Needed for Pagination
export const fetchTaskCount = (status = null) => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/tasks/count?filter=${JSON.stringify(status)}`)
    .then(({ data }) => {
      dispatch({
        type: actions.TASK_COUNT_SUCCESS,
        payload: { taskCount: data.count }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

// Needed For TaskAdd Page
export const fetchProperties = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/properties`)
    .then(({ data }) => {
      dispatch({
        type: actions.TASKS_PROPERTIES_SUCCESS,
        payload: { properties: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

export const fetchEmployees = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/employees`)
    .then(({ data }) => {
      dispatch({
        type: actions.TASKS_EMPLOYEES_SUCCESS,
        payload: { employees: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

export const fetchReservations = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .get(`${config.apiUrl}/api/reservations`)
    .then(({ data }) => {
      dispatch({
        type: actions.TASKS_RESERVATIONS_SUCCESS,
        payload: { reservations: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

export const createTask = (body = {}) => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  return axios
    .post(`${config.apiUrl}/api/tasks`, body)
    .then(({ data }) => {
      dispatch({
        type: actions.FETCH_TASK_SUCCESS,
        payload: { tasks: data.data }
      });
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
      throw err;
    });
};

// Needed to Update task
export const updateTask = (body = {}) => dispatch => {
  dispatch({
    type: actions.FETCH_TASK_ATTEMPT
  });
  return axios
    .put(`${config.apiUrl}/api/tasks/${body._id}`, body)
    .then(({ data }) => {
      dispatch({
        type: actions.FETCH_TASK_SUCCESS,
        payload: { tasks: data.data }
      });
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
      throw err;
    });
};

// Needed to Toggle
export const toggleTask = (body = {}) => dispatch => {
  dispatch({
    type: actions.FETCH_TASK_ATTEMPT
  });
  return axios
    .put(`${config.apiUrl}/api/tasks/${body._id}`, body)
    .then(({ data }) => {
      dispatch({
        type: actions.TASK_TOGGLE_SUCCESS,
        payload: { tasks: data.data }
      });
      return data.data;
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
      throw err;
    });
};

// Needed to delete a task
export const deleteTask = id => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });
  return axios
    .delete(`${config.apiUrl}/api/tasks/${id}`)
    .then(response => {
      dispatch({
        type: actions.DELETE_TASK_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.FETCH_TASK_FAILURE,
        payload: err
      });
    });
};

// Needed for permissions
export const fetchUserLog = () => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });
  return axios
    .get(`${config.apiUrl}/api/users/me`)
    .then(({ data }) => {
      dispatch({
        type: actions.TASKS_USER_SUCCESS,
        payload: { user: data.data }
      });
    })
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};

// Needed for labels
export const fetchIncompletedTaskCount = (
  status = null,
  completed = false
) => dispatch => {
  dispatch({ type: actions.FETCH_TASK_ATTEMPT });

  function getIncompletedTaskCounts(status = null, completed = false) {
    return axios.get(
      `${config.apiUrl}/api/tasks/count?filter=${JSON.stringify({
        status,
        completed
      })}`
    );
  }

  return axios
    .all([
      getIncompletedTaskCounts("overdue"),
      getIncompletedTaskCounts("due today"),
      getIncompletedTaskCounts("upcoming")
    ])
    .then(
      axios.spread(
        (overdueIncompleted, duetodayIncompleted, upcomingIncompleted) => {
          const taskResult = {
            overdueIncompleted: overdueIncompleted.data.count,
            duetodayIncompleted: duetodayIncompleted.data.count,
            upcomingIncompleted: upcomingIncompleted.data.count
          };
          dispatch({
            type: actions.TASK_INCOMPLETED_COUNT_SUCCESS,
            payload: taskResult
          });
        }
      )
    )
    .catch(err => {
      dispatch({ type: actions.FETCH_TASK_FAILURE, payload: err });
    });
};
