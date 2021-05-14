const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');
const { sequelize } = require('../../db/models');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Transfer.findAll({
    where: { customer_id: req.user.id },
    include: [
      { model: db.Wallet, as: 'origin_wallet' },
      { model: db.Wallet, as: 'destination_wallet' },
    ],
  })
    .then((foundTransfers) => {
      const processedTransfers = foundTransfers.map((transfer) => {
        const {
          id,
          amount,
          generation_date, // eslint-disable-line camelcase
          origin_wallet, // eslint-disable-line camelcase
          destination_wallet, // eslint-disable-line camelcase
        } = transfer.dataValues;

        return {
          id,
          amount,
          generation_date,
          origin_wallet: {
            id: origin_wallet.id,
            name: origin_wallet.name,
            balance: origin_wallet.balance,
          },
          destination_wallet: {
            id: destination_wallet.id,
            name: destination_wallet.name,
            balance: destination_wallet.balance,
          },
        };
      });
      res.status(statusCode.OK).json(processedTransfers);
    })
    .catch((error) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
});

router.post('/add', async (req, res) => {
  const newTransfer = {
    amount: req.body.amount,
    generation_date: req.body.generation_date,
    customer_id: req.user.id,
    origin_wallet_id: req.body.origin_wallet_id,
    destination_wallet_id: req.body.destination_wallet_id,
  };

  const transac = await sequelize.transaction();

  try {
    const createdTransfer = await db.Transfer.create(newTransfer, { transaction: transac });
    const foundOriginWallet = await db.Wallet.findByPk(newTransfer.origin_wallet_id);
    const foundDestinationWallet = await db.Wallet.findByPk(newTransfer.destination_wallet_id);

    const updatedOriginBalance =
      Number(foundOriginWallet.dataValues.balance) - Number(newTransfer.amount);
    const updatedDestinationBalance =
      Number(foundDestinationWallet.dataValues.balance) + Number(newTransfer.amount);

    if (updatedOriginBalance < 0) throw new Error(errorCode.UNFINISHED_OPERATION);

    await db.Wallet.update(
      { balance: updatedOriginBalance },
      {
        where: { id: +newTransfer.origin_wallet_id }, // eslint-disable-line camelcase
        returning: true,
        plain: true,
      },
    );

    await db.Wallet.update(
      { balance: updatedDestinationBalance },
      {
        where: { id: +newTransfer.destination_wallet_id }, // eslint-disable-line camelcase
        returning: true,
        plain: true,
      },
    );

    await transac.commit();
    res.status(statusCode.CREATED).json(createdTransfer);
  } catch (error) {
    await transac.rollback();
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = router;
