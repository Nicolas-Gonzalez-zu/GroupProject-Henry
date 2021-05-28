const server = require('express').Router();
const db = require('../../db/models');
const request = require('request');

const validate = function (body = {}) {
  return new Promise((resolve, reject) => {
    let postreq = 'cmd=_notify-validate';

    Object.keys(body).map((key) => {
      postreq = `${postreq}&${key}=${body[key]}`;
      return key;
    });

    const options = {
      url: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr',
      method: 'POST',
      headers: {
        'Content-Length': postreq.length,
      },
      encoding: 'utf-8',
      body: postreq,
    };

    request(options, (error, response, resBody) => {
      if (error || response.statusCode !== 200) {
        reject(new Error(error));
        return;
      }

      if (resBody.substring(0, 8) === 'VERIFIED') {
        resolve(true);
      } else if (resBody.substring(0, 7) === 'INVALID') {
        reject(new Error('IPN Message is invalid.'));
      } else {
        reject(new Error('Unexpected response body.'));
      }
    });
  });
};

server.post('/ipn', async (req, res) => {
  res.sendStatus(200);
  res.end();
  const body = req.body || {};

  try {
    const isValidated = await validate(body);
    if (!isValidated) {
      console.error('Error validating IPN message.');
      return;
    }
    const status = body.payment_status;

    switch (status) {
      case 'Completed':
        db.Customer.findByPk(body.transaction_subject).then((customer) => {
          const invoice = {
            payment_method: 'paypal',
            amount: body.payment_gross,
            status: 'completed',
            customer_id: customer.dataValues.user_id,
          };
          db.Invoice.create(invoice).then((createdInvoice) => {
            let services = [];
            for (var i in body) {
              if (i.substring(0, 11) === 'item_number') {
                services.push(Number(body[i]));
              }
            }
            console.log(body);
            console.log(createdInvoice);
            console.log(services);
            createdInvoice.addServices(services).then((services) => {
              console.log(services);
            });
          });
        });
      default:
        console.log('');
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = server;
