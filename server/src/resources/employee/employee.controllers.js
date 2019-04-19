import { BaseController } from '../../utils/BaseController';
import { User } from '../user/user.model';

class EmployeesControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  getEmployees = (req, res, next) => {
    return this.getMany(req, res, next, { role: 'employee' });
  };

  searchAll = (req, res, next) => {
    const filter = { role: 'employee' };
    // Properties to search
    const search = ['firstName', 'lastName', 'email', 'username'];

    return this.search(req, res, next, { filter, search });
  };

  count = (req, res, next) => {
    return this.countMine(req, res, next);
  };
}

const controllers = new EmployeesControllers(User);

export { controllers };
