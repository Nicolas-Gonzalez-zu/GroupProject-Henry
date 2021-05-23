const express = require('express');

const router = express.Router();

const frontOfficeRouter = require('./front-ofice');
const backOfficeRouter = require('./back-ofice');
const authRouter = require('./auth');
const mercadoPagoController = require('../controllers/mercadoPagoController');

router.use('/fo', frontOfficeRouter);
router.use('/bo', backOfficeRouter);
router.use('/auth', authRouter);
router.use('/ipn', mercadoPagoController);

module.exports = router;
