const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/', passport.authenticate('facebook'));

router.get(
  '/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

module.exports = router;
