import { Task } from './task.model';
import { BaseConroller } from '../../utils/BaseController';

class TaskControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  // add custon methods if needed
}

const controllers = new TaskControllers(Task);

export { controllers };