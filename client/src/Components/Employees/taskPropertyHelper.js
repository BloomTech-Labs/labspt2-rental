const taskPropertyAssign = opts => {
  const {
    employees,
    tasks,
    properties
  } = opts;

  if (tasks && properties) {
    const currentTime = Date.now();
    const newTasks = [];
    tasks.forEach(item => {
      const newTaskData = {};
      if (Date.parse(item.endDate) < currentTime) {
        newTaskData.overdue = true;
      } else if (Date.parse(item.startDate) < currentTime) {
        newTaskData.todayTask = true;
      }
      newTaskData.employee = item.assignedTo._id;
      newTasks.push(newTaskData);
    });
    employees.forEach(employee => {
      employee.overdue = 0;
      employee.todayTask = 0;
      employee.properties = 0;
      newTasks.forEach(task => {
        if (task.employee === employee._id) {
          if (task.overdue) {
            employee.overdue++;
          } else if (task.todayTask) {
            employee.todayTask++;
          }
        }
      });
      properties.forEach(property => {
        if (property.assistants.includes(employee._id)) {
          employee.properties++;
          employee.assignedProp.push(property.name)
        }
      });
    });
  }

  return employees
};

export default taskPropertyAssign;