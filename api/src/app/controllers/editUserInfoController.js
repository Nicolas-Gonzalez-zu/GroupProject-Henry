/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
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
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  db.User.findAll({
    where: { id: req.user.id },
    attributes: ['password'],
  })
    // eslint-disable-next-line consistent-return
    .then((pw) => {
      const pass = pw[0].dataValues.password;
      if (
        bcryptUtils.validatePassword(actualPassword, pass) &&
        newPassword === newPassword2 &&
        regex.test(newPassword)
      ) {
        const passEncripted = bcryptUtils.encrypt(newPassword, 10);
        db.User.update({ password: passEncripted }, { where: { id: req.user.id } })
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
    })
    .catch((e) => {
      res.status(500).json({ message: e.message, success: false });
    });
});
module.exports = router;
