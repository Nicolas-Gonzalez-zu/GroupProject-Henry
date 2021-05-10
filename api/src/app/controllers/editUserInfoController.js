const express = require('express');
const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');

const router = express.Router();
router.use(checkIfLoggedIn);

router.put('/', (req, res) => {
  console.log(req.body, 'aca esta el req');
  console.log(req.user.id, 'aca esta la id');
  db.User.update(req.body, { where: { id: req.body.id } })
    .then(() => {
      res.status(200).json({ message: 'User info updated' });
    })
    .catch((e) => {
      res.status(500).json({ message: e.message });
    });
});
module.exports = router;
