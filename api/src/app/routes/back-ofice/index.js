const express = require('express');

const { errorCode, statusCode } = require('../../utils/globalCodes');

const router = express.Router();

const categoryController = require('../../controllers/categoryController');
const employeeController = require('../../controllers/employeeController');
const permissionController = require('../../controllers/permissionController');
const rolController = require('../../controllers/rolController');
const serviceController = require('../../controllers/serviceController');

router.get('/', (req, res) => {
  res.status(statusCode.UNAUTHORIZED).json({ message: errorCode.UNAUTHORIZED_OPERATION });
});

router.use('/category', categoryController);
router.use('/employee', employeeController);
router.use('/permission', permissionController);
router.use('/rol', rolController);
router.use('/service', serviceController);

module.exports = router;
