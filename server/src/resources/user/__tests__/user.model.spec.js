import { User } from '../user.model';
import mongoose from 'mongoose';

describe('User model', () => {
  describe('schema', () => {
    test('email', () => {
      const { email } = User.schema.obj;
      expect(email).toEqual({
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 50
      });
    });

    test('username', () => {
      const { username } = User.schema.obj;
      expect(username).toEqual({
        type: String,
        required: true,
        unique: true,
        trim: true
      });
    });

    test('password', () => {
      const { password } = User.schema.obj;
      expect(password).toEqual({
        type: String,
        required: true
      });
    });
  });
});
