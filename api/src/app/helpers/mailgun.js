const mailgun = require('mailgun-js');

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendEmail = (to, from, subject, content, link) => {
  const data = {
    from,
    to,
    subject,
    template: content,
    'v:link': link,
  };
  return mg.messages().send(data);
};

module.exports = sendEmail;
