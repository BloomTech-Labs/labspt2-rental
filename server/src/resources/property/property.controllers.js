import { Property } from './property.model';
import { BaseController } from '../../utils/BaseController';

class PropertyControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  count = (req, res, next) => {
    return this.countMine(req, res, next);
  };
}

const controllers = new PropertyControllers(Property);

export { controllers };
