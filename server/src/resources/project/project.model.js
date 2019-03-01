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
      required: true
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    },
    team: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ]
  },
  { timestamps: true }
);

export const Project = mongoose.model('project', projectSchema);
