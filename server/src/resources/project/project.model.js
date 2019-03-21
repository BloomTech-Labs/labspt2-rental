import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
      autopopulate: true
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      autopopulate: true
    },
    team: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        autopopulate: true
      }
    ]
  },
  { timestamps: true }
);

projectSchema.plugin(require('mongoose-autopopulate'));

export const Project = mongoose.model('project', projectSchema);
