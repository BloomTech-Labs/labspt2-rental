const config = require('../../config');
const sgMail = require('@sendgrid/mail');

const sendgridKey = config.keys.sendgridKey;

export const sendMail = (req, res, next) => {
  sgMail.setApiKey(sendgridKey);
  const msg = req.body;
  sgMail
    .send(msg)
    .then(response => {
      if (response.status === 202) {
        res.status(202).json({ message: 'Email sent successfully' });
      } else {
        res.status(400).json({
          message: 'Email did not send. Please check message and try again.'
        });
      }
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};
