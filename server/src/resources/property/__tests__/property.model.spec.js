import { Property } from '../property.model';
import mongoose from 'mongoose';

describe('Property model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = Property.schema.obj;
      expect(name).toEqual({
        type: String,
        required: [true, 'Name is a required field'],
        unique: [true, 'Name must be unique']
      });
    });

    test('assistants', () => {
      const { assistants } = Property.schema.obj;
      expect(assistants).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'user'
        }
      ]);
    });

    test('createdBy', () => {
      const { createdBy } = Property.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      });
    });

    test('address', () => {
      const { address } = Property.schema.obj;
      expect(address).toEqual({
        type: String,
        required: [true, 'Address is a required field']
      });
    });

    test('price', () => {
      const { price } = Property.schema.obj;
      expect(price).toEqual({
        type: Number,
        required: true
      });
    });

    test('tasks', () => {
      const { tasks } = Property.schema.obj;
      expect(tasks).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'task'
        }
      ]);
    });
  });
});
