import * as actions from "./actions";

const initialState = {
  loading: false,
  error: false,
  employees: []
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EMPLOYEE_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload
      };
    case actions.EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.NUM_EMPLOYEE_SUCCESS:
      const numPages = Math.ceil(action.payload / 4)
      return {
        ...state,
        numPages: (numPages)
      };
    case actions.NUM_EMPLOYEE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case actions.TASKLIST_SUCCESS:
      const newState = state
      const currentTime = Date.now();
      const newTasks = []
      action.payload.data.forEach(item => {
        const newTaskData = {};
        if (Date.parse(item.endDate) < currentTime) {
          newTaskData.overdue = true
        } else if (Date.parse(item.startDate) < currentTime) {
          newTaskData.todayTask = true
        }
        newTaskData.employee = item.assignedTo._id
        newTasks.push(newTaskData)
      })
      newState.employees.forEach(employee => {
        employee.overdue = 0; employee.todayTask = 0
        newTasks.forEach(task => {
          if (task.employee === employee._id) {
            if (task.overdue) {
              employee.overdue++
            } else if (task.todayTask) {
              employee.todayTask++
            }
          }
        })
      })
      return {...newState}
    default:
      return { ...state };
  }
};

export default employeesReducer;
