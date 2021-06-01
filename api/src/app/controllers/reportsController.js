const express = require('express');
const { Op } = require('sequelize');
// const app = express();
const pdf = require('html-pdf');
const pug = require('pug');
const path = require('path');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode, supportCode } = require('../utils/globalCodes');
const { Sequelize } = require('../../db/models');

const router = express.Router();
router.use(checkIfLoggedIn);

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const options = {
  header: {
    height: '20mm',
  },
  footer: {
    height: '20mm',
  },
};

router.get('/', (req, res) => {
  const name = req.user.first_name;
  const lastname = req.user.last_name;
  const filter = 'All movements';
  const value = '';
  const date = new Date();

  const today = new Date();
  const monthBefore = new Date();
  monthBefore.setMonth(today.getMonth() - 1);
  const where = { customer_id: req.user.id };

  if (req.user.plan.dataValues.name === 'Free') {
    where.generation_date = { [Op.between]: [monthBefore, today] };
  }

  db.Movement.findAll({
    where,
    order: [['generation_date', 'ASC']],
    include: [
      { model: db.Wallet, as: 'origin_wallet' },
      { model: db.Budget, as: 'budget' },
    ],
  })
    .then((foundMovements) => {
      const processedMovements = foundMovements.map((movement) => {
        const {
          id,
          amount,
          type,
          generation_date, // eslint-disable-line camelcase
          description,
          origin_wallet, // eslint-disable-line camelcase
          budget,
        } = movement.dataValues;

        let conditionalBudget = {};
        if (budget) {
          conditionalBudget = {
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          };
        } else {
          conditionalBudget = {
            message: 'No bucket assigned',
          };
        }
        return {
          id,
          amount,
          type,
          generation_date: generation_date.toString(),
          description,
          wallet: {
            id: origin_wallet.id,
            name: origin_wallet.name,
            balance: origin_wallet.balance,
          },
          budget: conditionalBudget,
        };
      });
      const template = path.resolve(__dirname, '..', 'views', 'template.pug');
      const compiledFunction = pug.compileFile(template);
      const compiledHtml = compiledFunction({
        processedMovements,
        name,
        lastname,
        date,
        filter,
        value,
      });
      pdf.create(compiledHtml, options).toStream((err, file) => {
        if (err) {
          res.status(500).json(err);
        } else {
          file.pipe(res);
        }
      });
    })
    .catch((e) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
    });
});

router.get('/filter', (req, res) => {
  const { filter, value } = req.query;
  const name = req.user.first_name;
  const lastname = req.user.last_name;
  const date = new Date();
  db.Movement.findAll({
    where: { customer_id: req.user.id, [filter]: value },
    order: [['generation_date', 'ASC']],
    include: [
      { model: db.Wallet, as: 'origin_wallet' },
      { model: db.Budget, as: 'budget' },
    ],
  })
    .then((foundMovements) => {
      const processedMovements = foundMovements.map((movement) => {
        const {
          id,
          amount,
          type,
          generation_date, // eslint-disable-line camelcase
          description,
          origin_wallet, // eslint-disable-line camelcase
          budget,
        } = movement.dataValues;

        let conditionalBudget = {};
        if (budget) {
          conditionalBudget = {
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          };
        } else {
          conditionalBudget = {
            message: 'No bucket assigned',
          };
        }

        return {
          id,
          amount,
          type,
          generation_date: generation_date.toString(),
          description,
          wallet: {
            id: origin_wallet.id,
            name: origin_wallet.name,
            balance: origin_wallet.balance,
          },
          budget: conditionalBudget,
        };
      });
      const template = path.resolve(__dirname, '..', 'views', 'template.pug');
      const compiledFunction = pug.compileFile(template);
      const compiledHtml = compiledFunction({
        processedMovements,
        name,
        lastname,
        date,
        filter,
        value,
      });
      pdf.create(compiledHtml, options).toStream((err, file) => {
        if (err) {
          res.status(500).json(err);
        } else {
          file.pipe(res);
        }
      });
    })
    .catch((e) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
    });
});

module.exports = router;
