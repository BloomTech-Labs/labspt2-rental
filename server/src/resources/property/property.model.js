import mongoose from 'mongoose';

const { Schema } = mongoose;

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
      unique: [true, 'Name must be unique']
    },
    assistants: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
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
    image: String
  },
  { timestamps: true }
);

propertySchema.index({ '$**': 'text' });

export const Property = mongoose.model('property', propertySchema);
