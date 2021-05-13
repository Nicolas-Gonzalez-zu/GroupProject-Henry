const express = require('express');

const { errorCode, statusCode } = require('../../utils/globalCodes');

const router = express.Router();

const employeeController = require('../../controllers/employeeController');

router.get('/', (req, res) => {
  res.status(statusCode.UNAUTHORIZED).json({ message: errorCode.UNAUTHORIZED_OPERATION });
});

router.use('/employee', employeeController);

module.exports = router;
