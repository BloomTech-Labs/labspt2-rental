import { User } from '../../resources/user/user.model';
import { newToken } from '../auth';
import bcrypt from 'bcrypt';
import randtoken from 'rand-token';
import config from '../../config';
const sgMail = require('@sendgrid/mail');

const verifyResetToken = (req, res, next) => {
  User.findOne({
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: {
      $gte: Date.now()
    }
  })
    .then(user => {
      if (user == null) {
        res
          .status(401)
          .json({ message: 'Password reset link is invalid or has expired.' });
      } else {
        const token = newToken(user);

        res.status(200).json({
          message: 'Reset link is valid',
          id: user._id,
          token: token
        });
        next();
      }
    })
    .catch(err => {
      res.send(err);
    });
};

const sendResetEmail = (req, res, next) => {
  const resetEmail = req.body.email;
  User.findOne({ email: resetEmail })
    .select('-password')
    .then(user => {
      if (!user) {
        res.json({ message: 'Email does not exist' });
      } else {
        const token = randtoken.generate(16);

        const updatedInfo = {
          resetPasswordToken: token,
          resetPasswordExpires: Math.ceil(Date.now() + 3600000)
        };

        const options = {
          returnNewDocument: true
        };
        User.findOneAndUpdate({ email: resetEmail }, updatedInfo, options)
          .then(user => {
            if (user != null) {
              const sendgridKey = config.keys.sendgrid;
              sgMail.setApiKey(sendgridKey);
              const msg = {
                to: `${resetEmail}`,
                from: 'reset@roostr.io',
                subject: 'Your Password Reset',
                text: `Hello, Here is the password reset link you requested. If you did not make this request, please contact us. Your link will expire in 1 hour. Link: https://www.roostr.tech/forgot/${token} Thank you for choosing Roostr!`,
                html: `<h2>Hello!</h2><p>Here is the password reset link you requested. If you did not make this request, please contact us at help@roostr.io.</p><p>Your reset link will expire in <strong>1 hour</strong>.</p><p><a href="https://www.roostr.tech/forgot/${token}"></a>https://www.roostr.tech/forgot/${token}</p><h4>Thank you for choosing Roostr!</h4>`
              };
              sgMail
                .send(msg)
                .then(response => {
                  if (response) {
                    res
                      .status(202)
                      .json({ message: 'email sent successfully.' });
                  }
                })
                .catch(err => {
                  res.status(400).send(err);
                });
            } else {
              res
                .status(400)
                .json({ message: 'unable to send reset link at this time.' });
            }
          })
          .catch(err => {
            res.status(400).send(err);
          });
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const updateByEmail = async (req, res, next) => {
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
    if (updatedPassword) {
      res.status(200).json({ data: updatedPassword });
    }
  } catch (err) {
    next(err);
  }
};

export const controllers = {
  sendResetEmail,
  updateByEmail,
  verifyResetToken
};
