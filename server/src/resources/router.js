import projectRouter from './project/project.router';
import userRouter from './user/user.router';
import taskRouter from './task/task.router';
import propertyRouter from './property/property.router';
import discountRouter from './discount/discount.router';
import billingPlanRouter from './billingPlan/billingPlan.router';
import invoiceItemsRouter from './invoice_items/invoice_items.router';
import invoiceRouter from './invoice/invoice.router';
import employeeRouter from './employee/employee.router';
import reservationsRouter from './reservations/reservations.router';
import { protect } from '../utils/auth';
import stripeRouter from '../utils/stripe/stripe.router';

export const publicRouter = app => {
  app.use('/api/users', userRouter);
};

export const protectedRouter = app => {
  try {
    app.use(protect);
    app.use('/api/projects', projectRouter);
    app.use('/api/tasks', taskRouter);
    app.use('/api/properties', propertyRouter);
    app.use('/api/discounts', discountRouter);
    app.use('/api/billing-plans', billingPlanRouter);
    app.use('/api/invoice-items', invoiceItemsRouter);
    app.use('/api/invoices', invoiceRouter);
    app.use('/api/employees', employeeRouter);
    app.use('/api/stripe', stripeRouter);
    app.use('/api/reservations', reservationsRouter);
  } catch (e) {
    console.error(e);
  }
};
