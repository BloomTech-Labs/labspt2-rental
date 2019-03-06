import BaseController from '../../utils/BaseController';
import { InvoiceItems } from './invoice_items.model';

class InvoiceItemsControllers extends BaseController {
  // Create specific methods here
  constructor(mongooseModel) {
    super(mongooseModel);
    this.mongooseModel = mongooseModel;
  }
}

const invoiceItemsControllers = InvoiceItemsControllers(InvoiceItems);

export { invoiceItemsControllers };
