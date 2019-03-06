import { Task } from '../task.model';
import mongoose from 'mongoose';

describe('Task model', () => {
  describe('schema', () => {

    test('description', () => {
      const { description } = Task.schema.obj;
      expect(description).toEqual({
        type: String,
        required: true
      });
    });

    test('createdBy', () => {
      const { createdBy } = Task.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      });
    });

    test('startDate', () => {
      const { startDate } = Task.schema.obj;
      expect(startDate).toEqual({
        type: Date
      });
    });

    test('endDate', () => {
      const { endDate } = Task.schema.obj;
      expect(endDate).toEqual({
        type: Date
      });
    });

    test('completed', () => {
      const { copleted } = Task.schema.obj;
      expect(completed).toEqual({
        type: Boolean,
        required: true,
        default: false
      });
    });

    test('house', () => {
      const { house } = Task.schema.obj;
      expect(house).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'house'
      });
    });

    test('reservation', () => {
      const { reservation} = Task.schema.obj;
      expect(reservation).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'reservation'
      });
    });

  });
});