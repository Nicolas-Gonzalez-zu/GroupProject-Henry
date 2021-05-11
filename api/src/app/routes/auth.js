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
          res.status(201).json({ success: true });
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

router.post('/mail-exists', (req, res) => {
  const { email, type } = req.body;
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const validEmail = regex.test(email);
  console.log(email, type, validEmail);
  if (type && validEmail) {
    if (type === 'customer') {
      return db.User.findOne({ where: { email } }).then((user) => {
        if (user) {
          db.Customer.findByPk(user.id).then((c) => {
            if (!c) {
              res.status(200).json({ exists: false });
            }
            res.status(200).json({ exists: true });
          });
        } else {
          res.status(200).json({ exists: false });
        }
      });
    }
    return res.status(400).json({ error: 'Invalid user type' });
  }
  return res.status(400).json({ error: 'Invalid data' });
});
module.exports = router;
