const express = require('express');

const router = express.Router();

const walletController = require('../../controllers/walletController');
const budgetController = require('../../controllers/budgetController');

router.use('/wallet', walletController);
router.use('/budget', budgetController);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

module.exports = router;
