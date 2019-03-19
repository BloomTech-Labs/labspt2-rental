import { InvoiceItem } from './invoice_items.model';
import { BaseController } from '../../utils/BaseController';

class InvoiceItemsControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const controllers = new InvoiceItemsControllers(InvoiceItem);

export { controllers };
