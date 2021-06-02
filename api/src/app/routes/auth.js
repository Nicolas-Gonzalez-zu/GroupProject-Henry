/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcryptUtils = require('../utils/bcryptUtils');
const facebookauth = require('../controllers/facebookauth');

const sendEmail = require('../helpers/sendgrid');

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
  res.status(200).json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ loggedOut: true });
});

router.post('/mail-exists', (req, res) => {
  const { email, type } = req.body;
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const validEmail = regex.test(email);
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

router.post('/forgotPassword', (req, res) => {
  const { email } = req.body;
  db.User.findOne({ where: { email } })
    .then((user) => {
      if (user === null) return res.status(200).json({ message: 'request recived' });
      const secret = process.env.JWT_SECRET + user.password;
      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, secret, { expiresIn: '15m' });
      const link = `http://localhost:3000/client/resetPassword/${user.id}/${token}`;

      sendEmail(user.email, 'Forgot password', link, 'd-0ab651e511cd4640a24fa879effca7fd');

      return res.status(200).json({ message: 'request recived' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, success: false });
    });
});

router.post('/resetPassword/:id/:token', (req, res) => {
  const { id, token } = req.params;
  const { password1, password2 } = req.body;

  db.User.findOne({ where: { id } })
    .then((user) => {
      if (user === null) return res.status(200).json({ message: 'request recived' });
      const secret = process.env.JWT_SECRET + user.password;
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

      try {
        const payload = jwt.verify(token, secret);
        if (password1 === password2 && regex.test(password1)) {
          const passEncripted = bcryptUtils.encrypt(password1, 10);
          db.User.update({ password: passEncripted }, { where: { id } })
            .then(() => {
              res.status(200).json({ message: 'User password updated', success: true });
            })
            .catch((e) => {
              res.status(500).json({ message: e.message, success: false });
            });
        } else {
          return res
            .status(400)
            .json({ message: "Your password didn't pass validations", success: false });
        }
      } catch (error) {
        console.log(error.message);
        res.send(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, success: false });
    });
});

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
);
router.use('/facebook', facebookauth);

module.exports = router;
