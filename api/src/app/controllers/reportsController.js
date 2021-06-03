const express = require('express');
const { Op } = require('sequelize');
// const app = express();
const pdf = require('html-pdf');
const pug = require('pug');
const path = require('path');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { statusCode } = require('../utils/globalCodes');

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
  const { filter, value, second, secval } = req.query;
  const name = req.user.first_name;
  const lastname = req.user.last_name;
  const date = new Date();
  let obj = {};
  let init = '';
  let end = '';
  const today = new Date();
  const monthBefore = new Date();
  monthBefore.setMonth(today.getMonth() - 1);

  if (filter === 'generation_date') {
    const date = value.slice(0, 10).split('-');
    init = new Date(date[0], date[1], date[2], 00, 00, 00);
    end = new Date(date[0], date[1], date[2], 23, 59, 59);
    init.setMonth(end.getMonth() - 1);
    end.setMonth(init.getMonth());
    if (second && secval) {
      obj = { customer_id: req.user.id, [filter]: { [Op.between]: [init, end] }, [second]: secval };
    } else {
      obj = { customer_id: req.user.id, [filter]: { [Op.between]: [init, end] } };
    }
  } else if (second === 'generation_date') {
    const date = secval.slice(0, 10).split('-');
    init = new Date(date[0], date[1], date[2], 00, 00, 00);
    end = new Date(date[0], date[1], date[2], 23, 59, 59);
    init.setMonth(end.getMonth() - 1);
    end.setMonth(init.getMonth());
    obj = { customer_id: req.user.id, [filter]: value, [second]: { [Op.between]: [init, end] } };
  } else if (second !== 'generation_date' && secval) {
    obj = { customer_id: req.user.id, [filter]: value, [second]: secval };
    if (req.user.plan.dataValues.name === 'Free') {
      obj.generation_date = { [Op.between]: [monthBefore, today] };
    }
  } else {
    obj = { customer_id: req.user.id, [filter]: value };
    if (req.user.plan.dataValues.name === 'Free') {
      obj.generation_date = { [Op.between]: [monthBefore, today] };
    }
  }
  db.Movement.findAll({
    where: obj,
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
        second,
        secval,
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
