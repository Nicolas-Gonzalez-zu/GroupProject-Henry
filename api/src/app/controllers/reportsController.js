const express = require('express');
const app = express();
const pdf = require('html-pdf');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode, supportCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

app.use('/static', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', './views');

app.set('view engine', 'pug');

router.get('/', (req, res) => {
  const name = req.user.first_name;
  const lastname = req.user.last_name;
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
      res.render('prueba.pug', { processedMovements, name, lastname });
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

module.exports = router;
