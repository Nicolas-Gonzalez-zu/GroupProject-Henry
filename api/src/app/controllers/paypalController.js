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
    //Para cambiar a live usar  esta url aquí abajo: url: 'https://ipnpb.paypal.com/cgi-bin/webscr'
    //Cambiar CLIENTID en componente Paypal por AX3FLInJLosLWk8CMAJ3pZcdgqPFn5uKExtddnqCmSh4ZLyNv3Aq4jqhMl4YHNLqHXEonS23iAQfwBHc
    // y cambiar link IPN en cuenta ecastillejos a algo como https://finance.app.yilmer.work/api/ipn/mp_test
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
    if (status === 'Completed') {
      db.Customer.findByPk(body.transaction_subject).then((customer) => {
        const invoice = {
          payment_method: 'paypal',
          amount: body.payment_gross,
          status: status,
          customer_id: customer.dataValues.user_id,
        };
        db.Invoice.create(invoice).then((createdInvoice) => {
          let services = [];
          for (var i in body) {
            if (i.substring(0, 11) === 'item_number') {
              services.push(Number(body[i]));
            }
          }
          createdInvoice.addServices(services).then((createdServ) => {
            const priority = customer.plan_id !== 1;
            const newOrder = {
              invoice_id: createdInvoice.dataValues.id,
              assigned_user_id: null,
              customer_id: customer.dataValues.user_id,
              status: 'unassigned',
              start_date: null,
              end_date: null,
              priority,
            };
            db.Order.create(newOrder).then(() => {
              console.log('Order and income created');
            });
          });
        });
      });
    } else {
      db.Customer.findByPk(body.transaction_subject).then((customer) => {
        const invoice = {
          payment_method: 'paypal',
          amount: body.payment_gross,
          status: 'declined',
          customer_id: customer.dataValues.user_id,
        };
        db.Invoice.create(invoice).then((createdInvoice) => {
          let services = [];
          for (var i in body) {
            if (i.substring(0, 11) === 'item_number') {
              services.push(Number(body[i]));
            }
          }
          createdInvoice.addServices(services).then((createdServ) => {
            console.log('service declined created');
          });
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = server;
