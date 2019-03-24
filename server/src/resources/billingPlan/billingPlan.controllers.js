import { BaseController } from '../../utils/BaseController';
import { BillingPlan } from './billingPlan.model';

class BillingPlanControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new BillingPlanControllers(BillingPlan);

export { controllers };
