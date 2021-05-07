const express = require('express');
const passport = require('passport');

const router = express.Router();

const checkIfLoggedIn = require('../auth/authorizeMiddleware');

router.get('/login', (req, res) => {
  res.status(405).json({ message: 'method not allowed' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(401).json({ errors: err });
    }
    if (!user) {
      return res.status(401).json(info);
    }
    return req.logIn(user, (error) => {
      if (error) {
        return res.status(401).json({ errors: err });
      }
      return res.status(200).json({ success: true });
    });
  })(req, res, next);
});

router.get('/test-auth', checkIfLoggedIn, (req, res, next) => {
  res.send('Logged');
});

module.exports = router;
