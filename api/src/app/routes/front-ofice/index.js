const express = require('express');

const router = express.Router();

const Upload = require('../../controllers/avatarUploadsController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const customerController = require('../../controllers/customerController');

router.use('/customer', customerController);

router.get('/', (req, res) => {
  res.json({ message: 'FO response' });
});

router.get('/form', Upload.displayForm);
router.post('/upload', multipartMiddleware, Upload.upload);

module.exports = router;
