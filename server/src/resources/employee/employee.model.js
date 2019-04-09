// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const employeeSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Employee name is a required field'],
//       maxlength: 100
//     },
//     user: {
//       type: mongoose.SchemaTypes.ObjectId,
//       ref: 'user'
//     },
//     createdBy: {
//       type: mongoose.SchemaTypes.ObjectId,
//       ref: 'user',
//       required: [true, 'createdBy is required']
//     },
//     employer: {
//       type: mongoose.SchemaTypes.ObjectId,
//       ref: 'user',
//       required: [true, 'Employer is a required field']
//     },
//     baseAddress: {
//       type: String,
//       required: [true, 'Employee must have an address']
//     },
//     taskPermission: {
//       type: Boolean,
//       default: false
//     },
//     propertyPermission: {
//       type: Boolean,
//       default: false
//     },
//     checkoutPermission: {
//       type: Boolean,
//       default: false
//     }
//   },
//   { timestamps: true }
// );

// export const Employees = mongoose.model('employees', employeeSchema);
