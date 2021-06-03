const mercadopago = require('mercadopago');
const server = require('express').Router();
const db = require('../../db/models');
const { generateOrderOrUpgrade } = require('../helpers/orders');

const processPayment = async (req, res, id, prod = false) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  try {
    const merchantOrder = await mercadopago.merchant_orders.findById(id);
    console.log(merchantOrder.body.items);
    const payments = prod
      ? merchantOrder.body.payments
          .filter((p) => p.status === 'approved')
          .map((p) => p.transaction_amount)
      : [merchantOrder.body.total_amount];
    const paidAmount = payments.length > 0 ? payments.reduce((a, b) => a + b) : 0;
    if (paidAmount >= merchantOrder.body.total_amount) {
      const invoice = await db.Invoice.findByPk(id);
      if (invoice) {
        const order = await db.Order.findByPk(id);
        if (!order) {
          const response = await generateOrderOrUpgrade(merchantOrder, invoice);
          if (response) res.status(201).json({ data: response });
          else res.status(500).json();
        } else res.status(201).json(order);
      } else {
        const newInvoice = {
          id: Number(id),
          payment_method: 'Mercado Pago',
          amount: Number(paidAmount),
          status: 'done',
          customer_id: Number(merchantOrder.body.external_reference),
        };
        const createdInvoice = await db.Invoice.create(newInvoice);
        if (createdInvoice) {
          const response = await generateOrderOrUpgrade(merchantOrder, createdInvoice);
          if (response) res.status(201).json({ data: response });
          else res.status(500).json();
        }
      }
    } else {
      res.status(200).json('rejected');
    }
  } catch (e) {
    res.status(500).send(e.stack);
  }
};

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

server.post('/', async (req, res) => {
  // eslint-disable-next-line camelcase
  const { services } = req.body;
  const { user } = req;

  const items =
    services &&
    services.map((service) => {
      const unit_price =
        Number(req.user.plan.price) <= 0 ? service.price - service.price * 0.2 : service.price;
      return {
        title: service.name,
        id: service.id,
        quantity: 1,
        unit_price: Number(unit_price),
      };
    });
  console.log('Items: ', items);
  const preference = {
    items,
    payer: {
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    },
    back_urls: {
      success: `${process.env.SITE_URL || 'http://localhost:3000'}/client/payment/confirmation`,
      failure: `${process.env.SITE_URL || 'http://localhost:3000'}/client/payment/confirmation`,
      pending: `${process.env.SITE_URL || 'http://localhost:3000'}/client/payment/confirmation`,
    },
    auto_return: 'approved',
    marketplace: 'E-conomy',
    statement_descriptor: 'ECONOMYAPP',
    notification_url: process.env.MP_IPN_URL || `https://finance.app.yilmer.work/api/ipn/mp_test`,
    binary_mode: true,
    external_reference: user.id.toString(),
  };

  mercadopago.preferences.create(preference).then((response) => {
    res.status(200).json(response);
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
          processPayment(req, res, order.id, true);
        })
        .catch((e) => {
          res.status(500).json({ error: e.stack });
        });
      break;
    case 'merchant_order':
      processPayment(req, res, id, true);
      break;
    default:
      res.status(200).json({});
  }
});

server.get('/mp_test', async (req, res) => {
  // const { id, topic } = req.query;
  const sandboxMid = '2756058575';
  // const realMid = '2755894389';
  processPayment(req, res, sandboxMid, false);
  // if (id && topic && topic === 'merchant_order') {
  //   return processPayment(req, res, id, false);
  // }
  // res.status(500).json({ error: 'invalid payment data' });
});

module.exports = server;
