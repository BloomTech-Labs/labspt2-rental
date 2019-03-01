import { Project } from '../project.model';
import mongoose from 'mongoose';

describe('Project model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = Project.schema.obj;
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true
      });
    });

    test('description', () => {
      const { description } = Project.schema.obj;
      expect(description).toEqual({
        type: String,
        required: true
      });
    });

    test('notes', () => {
      const { notes } = Project.schema.obj;
      expect(notes).toEqual({ type: String });
    });

    test('createdBy', () => {
      const { createdBy } = Project.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      });
    });

    test('manager', () => {
      const { manager } = Project.schema.obj;
      expect(manager).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      });
    });

    test('team', () => {
      const { team } = Project.schema.obj;
      expect(team).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'user'
        }
      ]);
    });
  });
});
