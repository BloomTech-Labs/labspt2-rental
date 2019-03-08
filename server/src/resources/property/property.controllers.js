import { Property } from './property.model';
import BaseController from '../../utils/BaseController';

class PropertyControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new PropertyControllers(Property);

export { controllers };
