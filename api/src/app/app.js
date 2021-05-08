const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passport = require('./auth/setup');

const router = require('./routes');

const { MONGO_URI } = process.env;

const app = express();

// logging middleware
app.use(logger('dev'));

// bodyparse middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session
app.use(
  session({
    secret: 'very secret key',
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
  }),
);

// Passport middlewares
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use('/api', router);

module.exports = app;
