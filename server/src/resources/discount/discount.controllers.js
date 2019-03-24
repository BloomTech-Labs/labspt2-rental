import { BaseController } from '../../utils/BaseController';
import { Discount } from './discount.model';

class DiscountControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new DiscountControllers(Discount);

export { controllers };
