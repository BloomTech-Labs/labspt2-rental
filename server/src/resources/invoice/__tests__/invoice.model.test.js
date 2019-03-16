import { Invoices } from '../invoice.model';
import mongoose from 'mongoose';

describe('Invoices model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = Invoices.schema.obj;
      expect(name).toEqual({
        type: String,
        required: [true, 'Employee name is a required field'],
        maxlength: 100
      });
    });

    test('user', () => {
      const { user } = Invoices.schema.obj;
      expect(user).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      });
    });

    test('createdBy', () => {
      const { createdBy } = Invoices.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'createdBy is required']
      });
    });

    test('employer', () => {
      const { employer } = Invoices.schema.obj;
      expect(employer).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'Employer is a required field']
      });
    });

    test('baseAddress', () => {
      const { baseAddress } = Invoices.schema.obj;
      expect(baseAddress).toEqual({
        type: String,
        required: [true, 'Employee must have an address']
      });
    });

    test('taskPermission', () => {
      const { taskPermission } = Invoices.schema.obj;
      expect(taskPermission).toEqual({
        type: Boolean,
        default: false
      });
    });

    test('propertyPermission', () => {
      const { propertyPermission } = Invoices.schema.obj;
      expect(propertyPermission).toEqual({
        type: Boolean,
        default: false
      });
    });

    test('checkoutPermission', () => {
      const { checkoutPermission } = Invoices.schema.obj;
      expect(checkoutPermission).toEqual({
        type: Boolean,
        default: false
      });
    });
  });
});
