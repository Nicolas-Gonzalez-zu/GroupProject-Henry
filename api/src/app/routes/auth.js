const express = require('express');
const passport = require('passport');
const bcryptUtils = require('../utils/bcryptUtils');

const db = require('../../db/models');

const router = express.Router();

const checkIfLoggedIn = require('../auth/authorizeMiddleware');

router.get('/login', (req, res) => {
  res.status(405).json({ message: 'method not allowed' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
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

router.post('/register', (req, res) => {
  const data = req.body;
  data.password = bcryptUtils.encrypt(data.password);
  db.User.create(data)
    .then((user) => {
      db.Customer.create({ user_id: user.id, plan_id: 1 })
        .then(() => {
          res.status(201).json({ message: 'Registration Successfully' });
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
});

router.get('/test-auth', checkIfLoggedIn, (req, res) => {
  res.send('Logged');
});

router.get('/me', checkIfLoggedIn, (req, res) => {
  db.Customer.findOne({
    where: { user_id: req.user.id },
    include: [
      { model: db.User, as: 'user' },
      { model: db.Plan, as: 'plan' },
    ],
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ loggedOut: true });
});
module.exports = router;
