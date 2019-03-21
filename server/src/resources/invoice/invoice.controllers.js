import { BaseController } from '../../utils/BaseController';
import { Invoices } from './invoice.model';

class InvoicesControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new InvoicesControllers(Invoices);

export { controllers };
