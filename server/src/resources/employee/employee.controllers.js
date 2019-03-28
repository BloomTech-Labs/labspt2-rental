import { BaseController } from '../../utils/BaseController';
import { User } from '../user/user.model';

class EmployeesControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  getEmployees = (req, res, next) => {
    return this.getMany(req, res, next, {role: "employee"})
  }
}

const controllers = new EmployeesControllers(User);

export { controllers };
