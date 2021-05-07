const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'customer root GET response' });
});

module.exports = router;
