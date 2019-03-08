import { Property } from './property.model';
import { BaseController } from '../../utils/BaseController';

class PropertyControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }

  // add custon methods if needed
}

const controllers = new PropertyControllers(Property);

export { controllers };
