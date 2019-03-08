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
    address: {
      type: String,
      required: [true, 'Address is a required field']
    },
    price: {
      type: Number,
      required: true
    },
    tasks: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'task'
      }
    ]
  },
  { timestamps: true }
);

export const Property = mongoose.model('property', propertySchema);
