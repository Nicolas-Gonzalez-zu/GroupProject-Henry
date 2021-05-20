const express = require('express');
const multipart = require('connect-multiparty');

const { errorCode, statusCode } = require('../../utils/globalCodes');

const multipartMiddleware = multipart();
const router = express.Router();

const budgetController = require('../../controllers/budgetController');
const customerController = require('../../controllers/customerController');
const editUserInfoController = require('../../controllers/editUserInfoController');
const movementController = require('../../controllers/movementController');
const transferController = require('../../controllers/transferController');
const walletController = require('../../controllers/walletController');
const categoryController = require('../../controllers/categoryController');

router.get('/', (req, res) => {
  res.status(statusCode.UNAUTHORIZED).json({ message: errorCode.UNAUTHORIZED_OPERATION });
});

router.use('/budget', budgetController);
router.use('/customer', customerController);
router.use('/editUserInfo', editUserInfoController);
router.use('/movement', movementController);
router.use('/transfer', transferController);
router.use('/wallet', walletController);
router.use('/category', categoryController);

const Upload = require('../../controllers/avatarUploadsController');

router.get('/form', Upload.displayForm);
router.post('/upload', multipartMiddleware, Upload.upload);

module.exports = router;
