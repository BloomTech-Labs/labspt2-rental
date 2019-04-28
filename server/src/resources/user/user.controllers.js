import { User } from './user.model';
import bcrypt from 'bcrypt';
import randtoken from 'rand-token';
import config from '../../config';
const sgMail = require('@sendgrid/mail');

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

export const verifyToken = (req, res, next) => {
  User.findOne({
    where: {
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    }
  })
    .then(user => {
      if (user == null) {
        res.json({ message: 'Password reset link is invalid or has expired.' });
      } else {
        res.status(200).json({ message: 'Reset link is valid' });
        next();
      }
    })
    .catch(err => {
      res.send(err);
    });
};

export const sendResetEmail = (req, res, next) => {
  const resetEmail = req.body.email;
  User.findOne({ where: { email: resetEmail } })
    .then(user => {
      if (!user) {
        res.json({ message: 'Email does not exist' });
      } else {
        const token = randtoken.generate(16);
        const updatedInfo = {
          resetPasswordToken: token,
          resetPasswordExpires: Math.ceil(Date.now() + 360000)
        };
        User.findOneAndUpdate({ where: { email: resetEmail } }, updatedInfo)
          .then(user => {
            if (user) {
              const sendgridKey = config.keys.sendgrid;
              sgMail.setApiKey(sendgridKey);
              const msg = {
                to: `${resetEmail}`,
                from: 'reset@roostr.io',
                subject: 'Your Password Reset',
                text: `Hello, Here is the password reset link you requested. If you did not make this request, please contact us. Your link will expire in 1 hour. Link: https://www.roostr.tech/emailreset/${token} Thank you for choosing Roostr!`,
                html: `<h2>Hello!</h2><p>Here is the password reset link you requested. If you did not make this request, please contact us at help@roostr.io.</p><p>Your reset link will expire in <strong>1 hour</strong>.</p><p><a href="https://www.roostr.tech/emailreset/${token}"></a>https://www.roostr.tech/emailreset/${token}</p><h4>Thank you for choosing Roostr!</h4>`
              };
              sgMail.send(msg);
            } else {
              res.json({ message: 'unable to send reset link at this time.' });
            }
          })
          .catch(err => {
            res.send(err);
          });
      }
    })
    .catch(err => {
      res.send(err);
    });
};

export const updateByEmail = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.newPassword, 8);
    req.body.newPassword = hash;

    const updatedPassword = await User.findByIdAndUpdate(
      req.body._id,
      req.body.newPassword
    )
      .select('-password')
      .lean()
      .exec();

    res.status(200).json({ data: updatedPassword });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const controllers = {
  me,
  updateMe,
  updatePassword,
  sendResetEmail,
  updateByEmail,
  verifyToken
};
