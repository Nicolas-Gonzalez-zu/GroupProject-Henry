const express = require('express');
const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');

const router = express.Router();
router.use(checkIfLoggedIn);

router.put('/', (req, res) => {
  db.User.update(req.body, { where: { id: req.user.id } })
    .then(() => {
      res.status(200).json({ message: 'User info updated', success: true });
    })
    .catch((e) => {
      res.status(500).json({ message: e.message, success: false });
    });
});
module.exports = router;
