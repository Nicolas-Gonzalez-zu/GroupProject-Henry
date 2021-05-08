const express = require('express');
const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');

const router = express.Router();

router.get('/', checkIfLoggedIn, (req, res) => {
  res.json({ message: 'model name root GET response' });
});

module.exports = router;
