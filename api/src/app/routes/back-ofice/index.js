const express = require('express');

const { errorCode, statusCode } = require('../../utils/globalCodes');

const router = express.Router();

const employeeController = require('../../controllers/employeeController');
const permissionController = require('../../controllers/permissionController');
const rolController = require('../../controllers/rolController');

router.get('/', (req, res) => {
  res.status(statusCode.UNAUTHORIZED).json({ message: errorCode.UNAUTHORIZED_OPERATION });
});

router.use('/employee', employeeController);
router.use('/permission', permissionController);
router.use('/rol', rolController);

module.exports = router;
