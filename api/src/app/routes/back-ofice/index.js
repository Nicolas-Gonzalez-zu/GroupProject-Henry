const express = require('express');

const { errorCode, statusCode } = require('../../utils/globalCodes');

const router = express.Router();

const permissionController = require('../../controllers/permissionController');

router.get('/', (req, res) => {
  res.status(statusCode.UNAUTHORIZED).json({ message: errorCode.UNAUTHORIZED_OPERATION });
});

router.use('/permission', permissionController);

module.exports = router;
