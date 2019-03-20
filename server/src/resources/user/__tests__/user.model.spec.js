import { User } from '../user.model';
import mongoose from 'mongoose';

describe('User model', () => {
  test('snapshot', () => {
    expect(User.schema).toMatchSnapshot()
  })
});
