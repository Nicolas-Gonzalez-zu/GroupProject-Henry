const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('./auth/setup');

const corsOptions = {
  credentials: true,
  origin: true, // ['http://localhost:3001'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = require('./routes');

const { MONGO_URI } = process.env;

const app = express();

app.set('view engine', 'ejs');

// logging middleware
app.use(logger('dev'));

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// bodyparse middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session
app.use(
  session({
    secret: 'very secret key',
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    sameSite: true,
  }),
);

// Passport middlewares
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(cors(corsOptions));
app.use('/api', router);

module.exports = app;
