const express = require('express');

const router = express.Router();

const frontOfficeRouter = require('./front-ofice');
const backOfficeRouter = require('./back-ofice');
const authRouter = require('./auth');

router.use('/fo', frontOfficeRouter);
router.use('/bo', backOfficeRouter);
router.use('/auth', authRouter);

module.exports = router;
