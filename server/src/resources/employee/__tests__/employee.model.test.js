import { Employees } from '../employee.model';
import mongoose from 'mongoose';

describe('Employees model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = Employees.schema.obj;
      expect(name).toEqual({
        type: String,
        required: [true, 'Employee name is a required field'],
        maxlength: 100
      });
    });

    test('user', () => {
      const { user } = Employees.schema.obj;
      expect(user).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      });
    });

    test('createdBy', () => {
      const { createdBy } = Employees.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'createdBy is required']
      });
    });

    test('employer', () => {
      const { employer } = Employees.schema.obj;
      expect(employer).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'Employer is a required field']
      });
    });

    test('baseAddress', () => {
      const { baseAddress } = Employees.schema.obj;
      expect(baseAddress).toEqual({
        type: String,
        required: [true, 'Employee must have an address']
      });
    });

    test('taskPermission', () => {
      const { taskPermission } = Employees.schema.obj;
      expect(taskPermission).toEqual({
        type: Boolean,
        default: false
      });
    });

    test('propertyPermission', () => {
      const { propertyPermission } = Employees.schema.obj;
      expect(propertyPermission).toEqual({
        type: Boolean,
        default: false
      });
    });

    test('checkoutPermission', () => {
      const { checkoutPermission } = Employees.schema.obj;
      expect(checkoutPermission).toEqual({
        type: Boolean,
        default: false
      });
    });
  });
});
