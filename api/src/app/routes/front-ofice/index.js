const express = require('express');

const router = express.Router();

const walletController = require('../../controllers/walletController');

router.use('/wallet', walletController);
const customerController = require('../../controllers/customerController');
const walletControlelr = require('../../controllers/walletController');

router.use('/customer', customerController);
router.use('/wallet', walletControlelr);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

module.exports = router;
