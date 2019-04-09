import { User } from '../user.model';
import mongoose from 'mongoose';

describe('User model', () => {
  test('snapshot', () => {
    expect(User.schema).toMatchSnapshot();
  });
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

    test('firstName', () => {
      const { firstName } = User.schema.obj;
      expect(firstName).toEqual({
        type: String,
        required: true
      });
    });

    test('lastName', () => {
      const { lastName } = User.schema.obj;
      expect(lastName).toEqual({
        type: String,
        required: true
      });
    });

    // not sure about this test for permissions
    // test('permissions', () => {
    //   const { permissions } = User.schema.obj;
    //   expect(permissions).toEqual({
    //   });
    // });

    test('role', () => {
      const { role } = User.schema.obj;
      expect(role).toEqual({
        type: String,
        enum: ['admin', 'owner', 'employee', 'guest']
      });
    });

    test('createdBy', () => {
      const { createdBy } = User.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      });
    });
  });
});
