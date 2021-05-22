const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Rol.findAll({
    include: { model: db.Permission },
  })
    .then((foundRols) => {
      res.status(statusCode.OK).json(foundRols);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', (req, res) => {
  const rol = {
    name: req.body.name,
    status: req.body.status,
  };

  if (rol.name && rol.status !== undefined) {
    db.Rol.create(rol)
      .then((createdRol) => {
        req.body.permissions.forEach((permission) => {
          createdRol.addPermission(permission);
        });
        res.status(statusCode.CREATED).json(createdRol);
      })
      .catch(() => {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
      });
  } else {
    res.status(statusCode.BAD_REQUEST).json({ error: errorCode.INCONSISTENT_DATA });
  }
});

router.put('/edit', (req, res) => {
  const { rol_id, name, status } = req.body; // eslint-disable-line camelcase

  const modifiedRol = {};
  if (name) modifiedRol.name = name;
  if (status) modifiedRol.status = status;

  // eslint-disable-next-line camelcase
  if (rol_id) {
    if (modifiedRol.name || modifiedRol.status) {
      db.Rol.update(modifiedRol, {
        where: { id: +rol_id }, // eslint-disable-line camelcase
        returning: true,
        plain: true,
      })
        .then((updatedRol) => {
          res.status(statusCode.OK).json(updatedRol[1]);
        })
        .catch(() => {
          res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .json({ error: errorCode.REJECTED_OPERATION });
        });
    } else {
      res.status(statusCode.BAD_REQUEST).json({ error: errorCode.INCONSISTENT_DATA });
    }
  } else {
    res.status(statusCode.BAD_REQUEST).json({ message: errorCode.MISSING_ATTRIBUTES });
  }
});

module.exports = router;
