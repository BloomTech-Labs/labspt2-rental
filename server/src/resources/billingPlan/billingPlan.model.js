import mongoose from 'mongoose';

const { Schema } = mongoose;

const billingPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Free', 'Midlevel', 'Enterprise']
    },
    perPropertyPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const BillingPlan = mongoose.model('billingPlan', billingPlanSchema);

// const seedowner = new Promise((resolve, reject) => {
//   User.findOne({ username: 'test_owner' }, (err, owner) => {
//     if (!owner) {
//       User.create({
//         role: 'owner',
//         username: 'test_owner',
//         password: '12345',
//         email: 'owner@roostr.io',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         billingPlan: faker.random.number({ min: 1, max: 3 })
//       })
//         .then(created => {
//           resolve(created);
//         })
//         .catch(() => reject(false));
//     } else {
//       resolve(owner);
//     }
//   });