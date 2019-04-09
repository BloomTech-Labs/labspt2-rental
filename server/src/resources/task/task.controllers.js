import { Task } from './task.model';
import { BaseController } from '../../utils/BaseController';

class TaskControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  // add custon methods if needed
  // overwrite getMany to getManyTasks tasks by assignTo not createdBy

  searchAll = (req, res, next) => {

    const lookup = [
      {
        $lookup: {
          localField: 'property',
          from: 'properties',
          foreignField: '_id',
          as: 'property'
        }
      }
    ];
  
    const search = [
      'description',
      'property.name',
      '_id'
    ];
    console.log(req.query.search);
    return this.search(req, res, next, { lookup, search });
  };

  count = (req, res, next) => {
    return this.countMine(req, res, next);
  };
}

const controllers = new TaskControllers(Task);

export { controllers };
