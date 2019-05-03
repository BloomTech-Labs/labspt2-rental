import projectRouter from './project/project.router';
import authRouter from './user/user.public.router';
import userRouter from './user/user.private.router';
import taskRouter from './task/task.router';
import propertyRouter from './property/property.router';
import discountRouter from './discount/discount.router';
import invoiceItemsRouter from './invoice_items/invoice_items.router';
import invoiceRouter from './invoice/invoice.router';
import employeeRouter from './employee/employee.router';
import reservationsRouter from './reservations/reservations.router';
import { protect } from '../utils/auth';
import stripeRouter from '../utils/stripe/stripe.router';
import applePayRouter from '../utils/stripe/applePay.router';
import sendgridRouter from '../utils/sendgrid/sendgrid.router';
import resetRouter from '../utils/Reset/reset.router';

export const sendGridRouter = app => {
  app.use('/api/sendgrid', sendgridRouter);
  app.use('/api/reset', resetRouter);
};

export const publicRouter = app => {
  app.use('/api/users', authRouter);
};

export const protectedRouter = app => {
  try {
    app.use(protect);
    app.use('/api/users', userRouter);
    app.use('/api/projects', projectRouter);
    app.use('/api/tasks', taskRouter);
    app.use('/api/properties', propertyRouter);
    app.use('/api/discounts', discountRouter);
    app.use('/api/invoice-items', invoiceItemsRouter);
    app.use('/api/invoices', invoiceRouter);
    app.use('/api/employees', employeeRouter);
    app.use('/api/stripe', stripeRouter);
    app.use('/api/reservations', reservationsRouter);
    app.use(
      '/.well-known/apple-developer-merchantid-domain-association',
      applePayRouter
    );
  } catch (e) {
    console.error(e);
  }
};
