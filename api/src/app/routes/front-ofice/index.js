const express = require('express');

const router = express.Router();

// const customerController = require('../../controllers/customerController');
const walletController = require('../../controllers/walletController');

router.use('/wallet', walletController);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

module.exports = router;
