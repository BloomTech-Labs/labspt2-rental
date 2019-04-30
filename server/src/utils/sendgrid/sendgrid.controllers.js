import config from '../../config';
const sgMail = require('@sendgrid/mail');

const sendgridKey = config.keys.sendgrid;

const sendMail = async (req, res, next) => {
  sgMail.setApiKey(sendgridKey);
  const msg = req.body;

  try {
    const sendMail = await sgMail.send(msg);

    if (sendMail) {
      return res.status(202).json({ message: 'Email sent successfully' });
    }
  } catch {
    return res.status(400).send({ message: 'Not successful' });
  }
};

export default sendMail;
