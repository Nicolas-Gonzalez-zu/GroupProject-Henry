const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Permission.findAll()
    .then((foundPermissions) => {
      res.status(statusCode.OK).json(foundPermissions);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', (req, res) => {
  const permission = req.body;
  db.Permission.create(permission)
    .then((createdPermission) => {
      res.status(statusCode.CREATED).json(createdPermission);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.put('/edit', (req, res) => {
  const { id, name, id_code, status } = req.body; // eslint-disable-line camelcase
  if (id) {
    const modifiedPermission = {};
    if (name) modifiedPermission.name = name;
    if (id_code) modifiedPermission.id_code = id_code; // eslint-disable-line camelcase
    if (status) modifiedPermission.status = status;

    if (modifiedPermission.name || modifiedPermission.id_code || modifiedPermission.status) {
      db.Permission.update(modifiedPermission, {
        where: { id },
        returning: true,
        plain: true,
      })
        .then((updatedPermission) => {
          res.status(statusCode.OK).json(updatedPermission[1]);
        })
        .catch(() => {
          res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .json({ error: errorCode.REJECTED_OPERATION });
        });
    } else {
      res.status(statusCode.BAD_REQUEST).json({ message: errorCode.INCONSISTENT_DATA });
    }
  } else {
    res.status(statusCode.BAD_REQUEST).json({ message: errorCode.MISSING_ATTRIBUTES });
  }
});

module.exports = router;
