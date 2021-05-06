const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const frontOfficeRouter = require('./routes/front-ofice');
const backOfficeRouter = require('./routes/back-ofice');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/fo', frontOfficeRouter);
app.use('/api/bo', backOfficeRouter);

module.exports = app;
