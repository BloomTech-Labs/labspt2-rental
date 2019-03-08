import { BaseController } from '../../utils/BaseController';
import { Discount } from './discount.model';

class DiscountControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const discountControllers = new DiscountControllers(Discount);

export { discountControllers };
