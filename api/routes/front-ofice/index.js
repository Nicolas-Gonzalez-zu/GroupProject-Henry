const express = require('express');

const router = express.Router();

const customerController = require('../../controllers/customerController');

router.use('/customer', customerController);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

module.exports = router;
