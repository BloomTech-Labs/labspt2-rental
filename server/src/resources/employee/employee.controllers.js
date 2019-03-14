import { BaseController } from '../../utils/BaseController';
import { Employees } from './employee.model';

class EmployeesControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new EmployeesControllers(Employees);

export { controllers };
