const config = require('../../config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.keys.sendgrid);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is fun',
  text: 'and easy to do anywhere.',
  html: '<strong>and easy to do anywhere.</strong>'
};

sgMail.send(msg);

//front end code
// sendEmail = msg => {
//   axios
//     .post(`${config.apiUrl}/api/sendgrid/mail/send`, msg)
//     .then(response => {
//       if (response.status === 202) {
//         window.alert("message went through");
//       } else {
//         window.alert(`failed with status code ${response.status}`);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
