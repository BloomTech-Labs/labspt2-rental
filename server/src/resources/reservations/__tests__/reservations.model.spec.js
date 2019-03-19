import { Reservation } from '../reservations.model';
import mongoose from 'mongoose';

describe('Reservation model', () => {
  describe('schema', () => {
    test('userID', () => {
      const { userID } = Reservation.schema.obj;
      expect(userID).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
      });
    });
    test('house', () => {
      const { house } = Reservation.schema.obj;
      expect(house).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'house',
        required: true
      });
    });
    test('checkIn', () => {
      const { checkIn } = Reservation.schema.obj;
      expect(checkIn).toEqual({
        type: Date,
        required: true
      });
    });
    test('checkOut', () => {
      const { checkOut } = Reservation.schema.obj;
      expect(checkOut).toEqual({
        type: Date,
        required: true
      });
    });
    test('address1', () => {
      const { address1 } = Reservation.schema.obj;
      expect(address1).toEqual({
        type: String,
        required: true
      });
    });
    test('address2', () => {
      const { address2 } = Reservation.schema.obj;
      expect(address2).toEqual({
        type: String
      });
    });
    test('city', () => {
      const { city } = Reservation.schema.obj;
      expect(city).toEqual({
        type: String,
        required: true
      });
    });
    test('state', () => {
      const { state } = Reservation.schema.obj;
      expect(state).toEqual({
        type: String,
        required: true
      });
    });
    test('zip', () => {
      const { zip } = Reservation.schema.obj;
      expect(zip).toEqual({
        type: String,
        required: true
      });
    });
    test('status', () => {
      const { status } = Reservation.schema.obj;
      expect(status).toEqual({
        type: String,
        enum: ['upcoming', 'incomplete', 'complete']
      });
    });
    test('tasks', () => {
      const { tasks } = Reservation.schema.obj;
      expect(tasks).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'task'
        }
      ]);
    });
    test('nights', () => {
      const { nights } = Reservation.schema.obj;
      expect(nights).toEqual({
        type: Number,
        required: true
      });
    });
    test('cleaningFee', () => {
      const { cleaningFee } = Reservation.schema.obj;
      expect(cleaningFee).toEqual({
        type: Number
      });
    });
    test('guests', () => {
      const { guests } = Reservation.schema.obj;
      expect(guests).toEqual({
        type: Number,
        required: true
      });
    });
    test('paid', () => {
      const { paid } = Reservation.schema.obj;
      expect(paid).toEqual({
        type: Boolean,
        default: false
      });
    });
    test('guestLoginCode', () => {
      const { guestLoginCode } = Reservation.schema.obj;
      expect(guestLoginCode).toEqual({
        type: String,
        required: true
      });
    });
  });
});
