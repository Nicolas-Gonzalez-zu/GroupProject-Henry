const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const passport = require('./auth/setup');

// const corsOptions = {
//   credentials: true,
//   origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const router = require('./routes');

const { MONGO_URI } = process.env;

const app = express();

app.set('view engine', 'ejs');

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
    sameSite: true,
  }),
);

// Passport middlewares
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use((req, res, next) => {
  // const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  const { origin } = req.headers;
  console.log('Origin: ', origin);
  // if (allowedOrigins.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access-control-allow-origin',
  );
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
app.use('/api', router);

module.exports = app;
