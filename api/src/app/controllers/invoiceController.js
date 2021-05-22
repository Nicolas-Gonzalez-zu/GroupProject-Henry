const express = require('express');
const pdf = require('html-pdf');
const pug = require('pug');
const path = require('path');

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
        const { id, payment_method, amount, status, createdAt } = invoice.dataValues; // eslint-disable-line camelcase
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
          createdAt,
          services: servicesContainer,
        };
      });
      res.status(statusCode.OK).json(processedInvoices);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.get('/inv', (req, res) => {
  let { value } = req.query;
  const name = req.user.first_name;
  const lastname = req.user.last_name;
  db.Invoice.findAll({
    where: { customer_id: req.user.id, id: value },
    include: { model: db.Service },
  })
    .then((foundInvoices) => {
      const processedInvoices = foundInvoices.map((invoice) => {
        const { id, payment_method, amount, status, createdAt } = invoice.dataValues; // eslint-disable-line camelcase
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
          date: createdAt.toString(),
          services: servicesContainer,
        };
      });
      const template = path.resolve(__dirname, '..', 'views', 'invoice.pug');
      const compiledFunction = pug.compileFile(template);
      const compiledHtml = compiledFunction({
        processedInvoices,
        name,
        lastname,
      });
      pdf.create(compiledHtml).toStream((err, file) => {
        if (err) {
          res.status(500).json(err);
        } else {
          file.pipe(res);
        }
      });
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
