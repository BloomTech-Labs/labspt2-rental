import mongoose from 'mongoose';

const { Schema } = mongoose;

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
      unique: [true, 'Name must be unique']
    },
    active: {
      type: Boolean,
      default: true
    },
    assistants: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        autopopulate: true
      }
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      autopopulate: true
    },
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    cleaningFee: {
      type: Number,
      default: 30
    },
    occupants: {
      type: Number
    },
    image: String
  },

  { timestamps: true }
);

propertySchema.plugin(require('mongoose-autopopulate'));

export const Property = mongoose.model('property', propertySchema);
