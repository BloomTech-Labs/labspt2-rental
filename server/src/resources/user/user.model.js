import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const Permissions = new Schema({
  task: Boolean,
  property: Boolean,
  checkout: Boolean
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 50
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    permissions: Permissions,
    role: {
      type: String,
      enum: ['admin', 'owner', 'employee', 'guest']
    },
    billingAddress: {
      address1: {
        type: String
      },
      address2: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      zip: {
        type: String
      }
    },
    stripeCustomerID: {
      type: String
    },
    subscriptionID: {
      type: String
    },
    billingPlan: {
      type: Number
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
