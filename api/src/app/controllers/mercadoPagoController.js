const mercadopago = require('mercadopago');
const server = require('express').Router();
const db = require('../../db/models');

const processPayment = (req, res, id) => {
  mercadopago.merchant_orders.findById(id).then((merchantOrder) => {
    const paidAmount = merchantOrder.payments
      .filter((p) => p.status === 'approved')
      .map((p) => p.transaction_amount)
      .reduce((a, b) => a + b);
    if (paidAmount >= merchantOrder.total_amount) {
      db.Invoice.findByPk(merchantOrder.external_reference)
        .then((invo) => {
          db.Customer.findByPk(invo.customer_id).then((customer) => {
            const priority = customer.plan_id !== 1;
            const newOrder = {
              invoice_id: invo.id,
              assigned_user_id: null,
              customer_id: invo.customer_id,
              status: 'unassigned',
              start_date: null,
              end_date: null,
              priority,
            };
            db.Order.create(newOrder).then(() => {
              // eslint-disable-next-line no-param-reassign
              invo.status = 'completed';
              invo.save().then(() => {
                res.status(201).json('created');
              });
            });
          });
        })
        .catch((e) => {
          console.log(e.stack);
          res.status(500).json(e);
        });
    }
    res.status(200).json({});
  });
};

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

server.post('/', async (req, res) => {
  // eslint-disable-next-line camelcase
  const { services, payment_method } = req.body;
  const { user } = req;

  const subtotal = services.map((s) => s.price).reduce((a, b) => a + b);
  const total = Number(req.user.plan.price) <= 0 ? subtotal - subtotal * 0.2 : subtotal;

  const invoice = {
    payment_method,
    amount: total,
    status: 'Pending',
    customer_id: req.user.id,
  };
  db.Invoice.create(invoice)
    .then((createdInvoice) => {
      const servicesIds = services.map((s) => s.id);
      createdInvoice.addServices(servicesIds).then(() => {
        const items =
          services &&
          services.map((service) => ({
            title: service.name,
            id: service.id,
            quantity: 1,
            //   quantity: Number(service.orderLine.quantity),
            unit_price: Number(service.price),
          }));

        const preference = {
          items,
          payer: {
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
          },
          back_urls: {
            success: `${process.env.SITE_URL || 'http://localhost:3000'}/client/invoice/${
              createdInvoice.id
            }`,
            failure: `${process.env.SITE_URL || 'http://localhost:3000'}/client/invoice/${
              createdInvoice.id
            }`,
            pending: `${process.env.SITE_URL || 'http://localhost:3000'}/client/invoice/${
              createdInvoice.id
            }`,
          },
          auto_return: 'approved',
          marketplace: 'E-conomy',
          statement_descriptor: 'ECONOMYAPP',
          notification_url:
            process.env.MP_IPN_URL || `https://finance.app.yilmer.work/api/ipn/mp_test`,
          binary_mode: true,
          external_reference: createdInvoice.id.toString(),
        };

        mercadopago.preferences.create(preference).then((response) => {
          res.status(200).json(response);
        });
      });
    })
    .catch((e) => {
      res.status(200).json({ error: e.message });
    });
});

server.post('/mp_prod', (req, res) => {
  const { topic, id } = req.query;
  switch (topic) {
    case 'payment':
      mercadopago.payment
        .get(id)
        .then(({ response }) => {
          const { order } = response;
          processPayment(req, res, order.id);
        })
        .catch((e) => {
          res.status(500).json({ error: e.stack });
        });
      break;
    case 'merchant_order':
      processPayment(req, res, id);
      break;
    default:
      res.status(200).json({});
  }
});

server.post('/mp_test', async (req, res) => {
  const { id, topic } = req.query;
  if (id && topic && topic === 'merchant_order') {
    mercadopago.merchant_orders.findById(id).then((merchantOrder) => {
      console.log(merchantOrder);
      const invoId = merchantOrder.response.external_reference;
      db.Invoice.findByPk(invoId)
        .then((invo) => {
          db.Customer.findByPk(invo.customer_id).then((customer) => {
            const priority = customer.plan_id !== 1;
            const newOrder = {
              invoice_id: invo.id,
              assigned_user_id: null,
              customer_id: invo.customer_id,
              status: 'unassigned',
              start_date: null,
              end_date: null,
              priority,
            };
            db.Order.create(newOrder).then(() => {
              // eslint-disable-next-line no-param-reassign
              invo.status = 'completed';
              invo.save().then(() => {
                res.status(201).json({ invoice: invo, order: newOrder });
              });
            });
          });
        })
        .catch((e) => {
          console.log(e.stack);
          res.status(500).json(e);
        });
    });
  } else {
    res.status(200).json({ error: 'invalid payment data' });
  }
});

module.exports = server;
