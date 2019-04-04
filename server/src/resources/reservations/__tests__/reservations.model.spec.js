import { Reservation } from '../reservations.model';
import mongoose from 'mongoose';

describe('Reservation model', () => {
  describe('schema', () => {
    test('createdBy', () => {
      const { createdBy } = Reservation.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
      });
    });
    /*test('guest', () => {
      const { guest } = Reservation.schema.obj;
      expect(guest).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
      });
    });*/
    test('assistant', () => {
      const { assistant } = Reservation.schema.obj;
      expect(assistant).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
      });
    });
    test('property', () => {
      const { property } = Reservation.schema.obj;
      expect(property).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'property',
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
    test('status', () => {
      const { status } = Reservation.schema.obj;
      expect(status).toEqual({
        type: String,
        enum: ['upcoming', 'incomplete', 'complete']
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
