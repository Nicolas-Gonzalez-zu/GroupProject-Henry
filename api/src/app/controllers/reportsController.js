const express = require('express');
//const app = express();
const pdf = require('html-pdf');
const pug = require('pug');
const path = require('path');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode, supportCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

//router.use('/static', express.static(__dirname + '/public'));

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//router.set('views', '../views');
//router.set('view engine', 'pug');

router.get('/', (req, res) => {
  const name = req.user.first_name;
  const lastname = req.user.last_name;
  var file = null;
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
      //res.render('prueba.pug', { processedMovements, name, lastname });
      const template = path.resolve(__dirname, '..', 'views', 'prueba.pug');
      const compiledFunction = pug.compileFile(template);
      const compiledHtml = compiledFunction({ processedMovements, name, lastname });
      pdf.create(compiledHtml).toStream((err, file) => {
        if (err) {
          res.status(500).json(err);
        } else {
          file.pipe(res);
          // res.status(200).json(file);
        }
      });
    })
    .catch((e) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
    });
});

module.exports = router;

// pug.renderFile(path, { processedMovements, name, lastname }, function (err, result) {
//   if (result) {
//     html = result;
//   } else {
//     res.end('An error occurred');
//     console.log(err);
//   }
// });

//res.render('prueba.pug', { processedMovements, name, lastname });
