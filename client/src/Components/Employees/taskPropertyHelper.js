const taskPropertyAssign = opts => {
  const { employees, tasks, properties } = opts;

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
      newTaskData.employee = item.assignedTo ? item.assignedTo._id : null;
      newTasks.push(newTaskData);
    });
    employees.forEach(employee => {
      employee.overdue = 0;
      employee.todayTask = 0;
      employee.properties = 0;
      employee.assignedProp = [];
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
        const ids = property.assistants.map(item => item._id) || [];
        if (ids.includes(employee._id)) {
          employee.properties++;
          employee.assignedProp.push({
            name: property.name,
            _id: property._id
          });
        }
      });
    });
  }

  return employees;
};

export default taskPropertyAssign;
