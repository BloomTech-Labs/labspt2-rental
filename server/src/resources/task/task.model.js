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
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    property: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'property',
      autopopulate: true
    },
    reservation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'reservation',
      autopopulate: true
    },
    assignedTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      autopopulate: true,
      required: true
    },
    status: {
      type: String,
      enum: ['upcoming', 'due today', 'overdue']
    }
  },
  { timestamps: true }
);

taskSchema.plugin(require('mongoose-autopopulate'));

export const Task = mongoose.model('task', taskSchema);
