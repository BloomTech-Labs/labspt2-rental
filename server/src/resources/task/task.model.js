import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is a required field'],
      maxLength: 200
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: [true, 'createdBy is a required field']
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    house: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'house'
    },
    reservation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'reservation'
    }
  },
  { timestamps: true }
);

export const Task = mongoose.model('task', taskSchema);