import BaseController from '../../utils/BaseController';
import { Billing } from './billing.model';

class BillingControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const billingControllers = BillingControllers(Billing);

export { billingControllers };