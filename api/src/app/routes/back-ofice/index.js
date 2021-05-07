const express = require('express');

const router = express.Router();

const employeeController = require('../../controllers/employeeController');

router.use('/employee', employeeController);

router.get('/', (req, res) => {
  res.status(401).json({ message: 'not allowed' });
});

module.exports = router;
