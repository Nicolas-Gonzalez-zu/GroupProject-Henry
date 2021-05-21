const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Invoice.findAll({
    where: { customer_id: req.user.id },
    include: { model: db.Service },
  })
    .then((foundInvoices) => {
      const processedInvoices = foundInvoices.map((invoice) => {
        const { id, payment_method, amount, status } = invoice.dataValues; // eslint-disable-line camelcase
        const servicesContainer = invoice.dataValues.Services.map((service) => ({
          id: service.dataValues.id,
          name: service.dataValues.name,
          price: service.dataValues.price,
        }));

        return {
          id,
          payment_method,
          amount,
          status,
          services: servicesContainer,
        };
      });
      res.status(statusCode.OK).json(processedInvoices);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', (req, res) => {
  const invoice = {
    payment_method: req.body.payment_method,
    amount: req.body.amount,
    status: req.body.status,
    customer_id: req.user.id,
  };

  db.Invoice.create(invoice)
    .then((createdInvoice) => {
      req.body.services.forEach((service) => {
        createdInvoice.addService(service);
      });
      res.status(statusCode.CREATED).json(createdInvoice);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

module.exports = router;
