const express = require('express');

const router = express.Router();
const multipart = require('connect-multiparty');
const Upload = require('../../controllers/avatarUploadsController');

const multipartMiddleware = multipart();

const walletController = require('../../controllers/walletController');
const budgetController = require('../../controllers/budgetController');

router.use('/wallet', walletController);

const customerController = require('../../controllers/customerController');
const walletControlelr = require('../../controllers/walletController');

router.use('/customer', customerController);
router.use('/wallet', walletControlelr);

router.use('/budget', budgetController);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

router.get('/form', Upload.displayForm);
router.post('/upload', multipartMiddleware, Upload.upload);

module.exports = router;
