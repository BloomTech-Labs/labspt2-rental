import { User } from './user.model';
import bcrypt from 'bcrypt';

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .select('-password')
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

const comparePasswords = (input, stored) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(input, stored, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

export const updatePassword = async (req, res, next) => {
  try {
    const password = await User.findById(req.user._id)
      .select('password')
      .lean()
      .exec();

    comparePasswords(req.body.oldPassword, password.password)
      .then(async response => {
        const hash = bcrypt.hashSync(req.body.newPassword.password, 8);
        req.body.newPassword.password = hash;

        const updatedPassword = await User.findByIdAndUpdate(
          req.user._id,
          req.body.newPassword,
          {
            new: true
          }
        )
          .select('-password')
          .lean()
          .exec();

        res.status(200).json({ data: updatedPassword });
      })
      .catch(err => console.log(err));
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const controllers = {
  me,
  updateMe,
  updatePassword
};
