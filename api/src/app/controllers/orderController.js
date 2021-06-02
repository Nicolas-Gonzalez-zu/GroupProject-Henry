const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  let processedOrders = [];

  db.Order.findAll({
    where: { customer_id: req.user.id },
  })
    .then((foundOrders) => {
      console.log('soy las ordenes en el backend', foundOrders);
      const organizedOrder = foundOrders.map((order) => {
        // eslint-disable-next-line camelcase
        const { id, invoice_id, assigned_user_id, status, start_date, end_date, priority } =
          order.dataValues;
        return {
          id,
          status,
          priority,
          start_date,
          end_date,
          assigned_user_id,
          assigned_user: {},
          invoice_id,
          invoice: {},
        };
      });
      return organizedOrder;
    })
    .then((organizedOrder) => {
      processedOrders = [...organizedOrder];
      const foundInvoices = processedOrders.map((order) =>
        db.Invoice.findOne({
          where: { id: +order.invoice_id },
          include: { model: db.Service },
        }),
      );
      return Promise.all(foundInvoices);
    })
    .then((foundInvoices) => {
      const processedInvoices = foundInvoices.map((invoice) => {
        const foundService = invoice.dataValues.Services;
        const processedServices = foundService.map((service) => ({
          id: service.id,
          name: service.name,
          price: service.price,
        }));

        return {
          id: invoice.id,
          payment_method: invoice.payment_method,
          amount: invoice.amount,
          status: invoice.status,
          services: processedServices,
        };
      });
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < processedOrders.length; x++) {
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < processedInvoices.length; y++) {
          if (processedOrders[x].invoice_id === processedInvoices[y].id) {
            processedOrders[x].invoice = processedInvoices[y];
          }
        }
      }
      const foundUsers = processedOrders.map((order) =>
        db.User.findOne({
          where: { id: +order.assigned_user_id },
        }),
      );

      return Promise.all(foundUsers);
    })
    .then((foundUsers) => {
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < foundUsers.length; x++) {
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < processedOrders.length; y++) {
          if (
            foundUsers[x] &&
            foundUsers[x].dataValues.id === processedOrders[y].assigned_user_id
          ) {
            processedOrders[y].assigned_user = {
              id: foundUsers[x].dataValues.id,
              name: `${foundUsers[x].dataValues.first_name} ${foundUsers[x].dataValues.last_name}`,
              phone: foundUsers[x].dataValues.phone,
              email: foundUsers[x].dataValues.email,
            };
          }
        }
      }
      res.status(statusCode.OK).json(processedOrders);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', (req, res) => {
  const newOrder = {
    invoice_id: req.body.invoice_id,
    customer_id: req.user.id,
    status: req.body.status,
    priority: req.body.priority,
    assigned_user_id: req.body.assigned_user_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  db.Order.create(newOrder)
    .then((createdOrder) => {
      res.status(statusCode.CREATED).json(createdOrder);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.put('/edit', (req, res) => {
  const { id, assigned_user_id, status, start_date, end_date, priority } = req.body; // eslint-disable-line camelcase
  if (id) {
    const order = {};
    if (assigned_user_id) order.assigned_user_id = assigned_user_id; // eslint-disable-line camelcase
    if (status) order.status = status;
    if (start_date) order.start_date = start_date; // eslint-disable-line camelcase
    if (end_date) order.end_date = end_date; // eslint-disable-line camelcase
    if (priority) order.priority = priority;
    if (
      order.assigned_user_id ||
      order.status ||
      order.start_date ||
      order.end_date ||
      order.priority
    ) {
      db.Order.update(order, {
        where: { id },
        returning: true,
        plain: true,
      })
        .then((updatedOrder) => {
          res.status(statusCode.OK).json(updatedOrder[1]);
        })
        .catch(() => {
          res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .json({ error: errorCode.REJECTED_OPERATION });
        });
    } else {
      res.status(statusCode.BAD_REQUEST).json({ message: errorCode.INCONSISTENT_DATA });
    }
  } else {
    res.status(statusCode.BAD_REQUEST).json({ message: errorCode.MISSING_ATTRIBUTES });
  }
});

router.get('/orderBo', (req, res) => {
  let processedOrders = [];

  db.Order.findAll()
    .then((foundOrders) => {
      console.log('soy las ordenes en el backend', foundOrders);
      const organizedOrder = foundOrders.map((order) => {
        // eslint-disable-next-line camelcase
        const { id, invoice_id, assigned_user_id, status, start_date, end_date, priority } =
          order.dataValues;
        return {
          id,
          status,
          priority,
          start_date,
          end_date,
          assigned_user_id,
          assigned_user: {},
          invoice_id,
          invoice: {},
        };
      });
      return organizedOrder;
    })
    .then((organizedOrder) => {
      processedOrders = [...organizedOrder];
      const foundInvoices = processedOrders.map((order) =>
        db.Invoice.findOne({
          where: { id: +order.invoice_id },
          include: { model: db.Service },
        }),
      );
      return Promise.all(foundInvoices);
    })
    .then((foundInvoices) => {
      const processedInvoices = foundInvoices.map((invoice) => {
        const foundService = invoice.dataValues.Services;
        const processedServices = foundService.map((service) => ({
          id: service.id,
          name: service.name,
          price: service.price,
        }));

        return {
          id: invoice.id,
          payment_method: invoice.payment_method,
          amount: invoice.amount,
          status: invoice.status,
          services: processedServices,
        };
      });
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < processedOrders.length; x++) {
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < processedInvoices.length; y++) {
          if (processedOrders[x].invoice_id === processedInvoices[y].id) {
            processedOrders[x].invoice = processedInvoices[y];
          }
        }
      }
      const foundUsers = processedOrders.map((order) =>
        db.User.findOne({
          where: { id: +order.assigned_user_id },
        }),
      );

      return Promise.all(foundUsers);
    })
    .then((foundUsers) => {
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < foundUsers.length; x++) {
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < processedOrders.length; y++) {
          if (
            foundUsers[x] &&
            foundUsers[x].dataValues.id === processedOrders[y].assigned_user_id
          ) {
            processedOrders[y].assigned_user = {
              id: foundUsers[x].dataValues.id,
              name: `${foundUsers[x].dataValues.first_name} ${foundUsers[x].dataValues.last_name}`,
              phone: foundUsers[x].dataValues.phone,
              email: foundUsers[x].dataValues.email,
            };
          }
        }
      }
      res.status(statusCode.OK).json(processedOrders);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

module.exports = router;
