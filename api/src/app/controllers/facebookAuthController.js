const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  }),
);

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/client?sucess=true`,
    failureRedirect: `${
      process.env.FRONTEND_URL || 'http://localhost:3000'
    }/client/login?fb_success=false`,
  }),
);

module.exports = router;
