const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Movement.findAll({
    where: { customer_id: req.user.id },
    include: [
      {
        model: db.Customer,
        as: 'customer',
        include: [{ model: db.User, as: 'user' }],
      },
      { model: db.Wallet, as: 'origin_wallet' },
      { model: db.Budget, as: 'budget' },
    ],
  })
    .then((foundMovements) => {
      console.log(foundMovements);
      const processedMovements = foundMovements.map((movement) => {
        const {
          id,
          amount,
          type,
          generation_date, // eslint-disable-line camelcase
          description,
          customer,
          origin_wallet, // eslint-disable-line camelcase
          budget,
        } = movement.dataValues;

        return {
          id,
          amount,
          type,
          generation_date,
          description,
          customer: {
            id: customer.id,
            first_name: customer.user.first_name,
            last_name: customer.user.last_name,
            full_name: `${customer.user.first_name} ${customer.user.last_name}`,
          },
          wallet: {
            id: origin_wallet.id,
            name: origin_wallet.name,
            balance: origin_wallet.balance,
          },
          budget: {
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          },
        };
      });
      res.status(statusCode.OK).json(processedMovements);
    })
    .catch((error) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
});

router.post('/add', (req, res) => {
  const newMovement = {
    amount: req.body.amount,
    type: req.body.type,
    generation_date: req.body.generation_date,
    description: req.body.description,
    customer_id: req.user.id,
    wallet_id: req.body.wallet_id,
    budget_id: req.body.budget_id,
  };

  db.Movement.create(newMovement)
    .then((createdMovement) => {
      res.status(statusCode.CREATED).json(createdMovement);
    })
    .catch((error) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
});

router.put('/edit', (req, res) => {
  const { movement_id, description, generation_date } = req.body; // eslint-disable-line camelcase
  if (req.body.movement_id) {
    const modifiedMovement = {};
    if (description) modifiedMovement.description = description;
    if (generation_date) modifiedMovement.generation_date = generation_date; // eslint-disable-line camelcase

    if (Object.keys(modifiedMovement).length) {
      db.Movement.update(modifiedMovement, {
        where: { id: +movement_id }, // eslint-disable-line camelcase
        returning: true,
        plain: true,
      })
        .then((updatedMovement) => {
          res.status(statusCode.OK).json(updatedMovement[1]);
        })
        .catch((error) => {
          res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        });
    } else {
      res.status(statusCode.BAD_REQUEST).json({ message: errorCode.INCONSISTENT_DATA });
    }
  } else {
    res.status(statusCode.BAD_REQUEST).json({ message: errorCode.MISSING_ATTRIBUTES });
  }
});

module.exports = router;
