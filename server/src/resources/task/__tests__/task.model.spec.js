import { Task } from '../task.model';
import mongoose from 'mongoose';

describe('Task model', () => {
  describe('schema', () => {
    test('description', () => {
      const { description } = Task.schema.obj;
      expect(description).toEqual({
        type: String,
        required: [true, 'Description is a required field'],
        maxLength: 200
      });
    });

    test('createdBy', () => {
      const { createdBy } = Task.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'createdBy is a required field']
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
        type: Date,
        required: true
      });
    });

    test('completed', () => {
      const { completed } = Task.schema.obj;
      expect(completed).toEqual({
        type: Boolean,
        required: true,
        default: false
      });
    });

    test('property', () => {
      const { property } = Task.schema.obj;
      expect(property).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'property',
        autopopulate: true
      });
    });

    test('reservation', () => {
      const { reservation } = Task.schema.obj;
      expect(reservation).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'reservation',
        autopopulate: true
      });
    });

    test('assignedTo', () => {
      const { assignedTo } = Task.schema.obj;
      expect(assignedTo).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        autopopulate: true,
        required: true
      });
    });

    test('status', () => {
      const { status } = Task.schema.obj;
      expect(status).toEqual({
        type: String,
        enum: ['upcoming', 'due today', 'overdue']
      });
    });
  });
});
