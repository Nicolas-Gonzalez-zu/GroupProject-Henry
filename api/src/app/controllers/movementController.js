const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode, supportCode } = require('../utils/globalCodes');
const { sequelize } = require('../../db/models');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Movement.findAll({
    where: { customer_id: req.user.id },
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
          generation_date,
          description,
          wallet: {
            id: origin_wallet.id,
            name: origin_wallet.name,
            balance: origin_wallet.balance,
          },
          budget: conditionalBudget,
        };
      });
      res.status(statusCode.OK).json(processedMovements);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', async (req, res) => {
  const newMovement = {
    amount: req.body.amount,
    type: req.body.type,
    generation_date: req.body.generation_date,
    description: req.body.description,
    customer_id: req.user.id,
    wallet_id: req.body.wallet_id,
    budget_id: req.body.budget_id,
  };

  const transac = await sequelize.transaction();

  try {
    const createdMovement = await db.Movement.create(newMovement, { transaction: transac });
    const foundedWallet = await db.Wallet.findByPk(newMovement.wallet_id);

    let updatedBalance = Number(foundedWallet.dataValues.balance);
    if (newMovement.type === supportCode.INCOME) {
      updatedBalance += Number(newMovement.amount);
    } else {
      updatedBalance -= Number(newMovement.amount);
      if (updatedBalance < 0) throw new Error(errorCode.UNFINISHED_OPERATION);
    }

    await db.Wallet.update(
      { balance: updatedBalance },
      {
        where: { id: +newMovement.wallet_id }, // eslint-disable-line camelcase
        returning: true,
        plain: true,
      },
    );
    await transac.commit();
    res.status(statusCode.CREATED).json(createdMovement);
  } catch (error) {
    await transac.rollback();
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
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
        .catch(() => {
          res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .json({ error: errorCode.REJECTED_OPERATION });
        });
    } else {
      res.status(statusCode.BAD_REQUEST).json({ error: errorCode.INCONSISTENT_DATA });
    }
  } else {
    res.status(statusCode.BAD_REQUEST).json({ error: errorCode.MISSING_ATTRIBUTES });
  }
});

module.exports = router;
