const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, link, templateId) => {
  const msg = {
    to,
    from: 'e.conomy.henry.proyect@gmail.com',
    subject,
    dynamic_template_data: {
      link,
    },
    templateId,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
