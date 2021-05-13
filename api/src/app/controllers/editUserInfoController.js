const express = require('express');
const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const bcryptUtils = require('../utils/bcryptUtils');

const router = express.Router();
router.use(checkIfLoggedIn);

router.put('/', (req, res) => {
  // verificar que el email no existe en otro user -> 404 findOne
  db.User.update(req.body, { where: { id: req.user.id } })
    .then(() => {
      res.status(200).json({ message: 'User info updated', success: true });
    })
    .catch((e) => {
      res.status(500).json({ message: e.message, success: false });
    });
});

router.put('/changePassword', (req, res) => {
  const { actualPassword, newPassword, newPassword2 } = req.body;
  db.User.findAll({
    where: { id: req.user.id },
    attributes: ['password'],
  })
    .then((pw) => {
      const pass = pw[0].dataValues.password;
      console.log(actualPassword);
      if (bcryptUtils.validatePassword(actualPassword, pass) && newPassword === newPassword2) {
        const passEncripted = bcryptUtils.encrypt(newPassword, 10);
        db.User.update({ password: passEncripted }, { where: { id: req.user.id } })
          .then(() => {
            res.status(200).json({ message: 'User password updated', success: true });
          })
          .catch((e) => {
            res.status(500).json({ message: e.message, success: false });
          });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: e.message, success: false });
    });
});
module.exports = router;
