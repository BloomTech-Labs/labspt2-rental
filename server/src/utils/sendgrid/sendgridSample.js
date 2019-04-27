const config = require('../../config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.keys.sendgrid);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is fun',
  text: 'and easy to do anywhere, even with this stupid back end architecture',
  html:
    '<strong>and easy to do anywhere, even with this stupid back end architecture</strong>'
};

sgMail.send(msg);
