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
      },
      {
        $lookup: {
          localField: 'assignedTo',
          from: 'users',
          foreignField: '_id',
          as: 'assignedTo'
        }
      }
    ];

    const search = [
      'description',
      'property.name',
      'assignedTo.firstName',
      'assignedTo.lastName',
      '_id'
    ];

    return this.search(req, res, next, { lookup, search });
  };

  deleteMany = async (req, res, next) => {
    let propertyID = req.body;
    try {
      this.mongooseModel.deleteMany({ property: propertyID }, (err, data) => {
        err
          ? res.status(500).json({ message: 'Could not delete tasks' })
          : res.status(200).json({ message: 'tasks deleted' });
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  count = (req, res, next) => {
    return this.countMine(req, res, next);
  };
}

const controllers = new TaskControllers(Task);

export { controllers };
