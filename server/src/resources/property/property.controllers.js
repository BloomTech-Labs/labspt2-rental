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
  searchAll = (req, res, next) => {
    // Other collections to join

    // Properties to search
    const search = ['name', 'address1', 'address2', 'city', 'state', '_id'];

    return this.search(req, res, next, { search });
  };
}

const controllers = new PropertyControllers(Property);

export { controllers };
