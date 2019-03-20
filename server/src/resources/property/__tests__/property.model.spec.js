import { Property } from '../property.model';
import mongoose from 'mongoose';
import { Reservation } from '../../reservations/reservations.model';

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

    test('price', () => {
      const { price } = Property.schema.obj;
      expect(price).toEqual({
        type: Number,
        required: true
      });
    });

    test('image', () => {
      const { image } = Property.schema.obj;
      expect(image).toEqual(String);
    });
  });
});
