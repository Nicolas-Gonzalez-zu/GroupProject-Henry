const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.SITE_URL || 'http://localhost:3000'}/client?sucess=true`,
    failureRedirect: `${
      process.env.SITE_URL || 'http://localhost:3000'
    }/client/login?gg_success=false`,
  }),
);

module.exports = router;
