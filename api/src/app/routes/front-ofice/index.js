const express = require('express');
const multipart = require('connect-multiparty');
const editUserInfoController = require('../../controllers/editUserInfoController');
const Upload = require('../../controllers/avatarUploadsController');
const walletController = require('../../controllers/walletController');
const budgetController = require('../../controllers/budgetController');
const customerController = require('../../controllers/customerController');
const walletControlelr = require('../../controllers/walletController');
const movementController = require('../../controllers/movementController');
const transferController = require('../../controllers/transferController');

const router = express.Router();

const multipartMiddleware = multipart();

router.use('/wallet', walletController);

router.use('/customer', customerController);
router.use('/wallet', walletControlelr);

router.use('/budget', budgetController);

router.use('/movement', movementController);
router.use('/transfer', transferController);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

router.use('/editUserInfo', editUserInfoController);

router.get('/form', Upload.displayForm);
router.post('/upload', multipartMiddleware, Upload.upload);

module.exports = router;
