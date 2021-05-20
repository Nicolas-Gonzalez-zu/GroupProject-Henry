const express = require('express');

const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();

router.get('/', (req, res) => {
  db.Category.findAll()
    .then((foundCategories) => {
      res.status(statusCode.OK).json(foundCategories);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', (req, res) => {
  const category = req.body;
  db.Category.create(category)
    .then((createdCategory) => {
      res.status(statusCode.CREATED).json(createdCategory);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.put('/edit', (req, res) => {
  const { id, name } = req.body;
  if (id) {
    const category = {};
    if (name) category.name = name;
    if (category.name) {
      db.Category.update(category, {
        where: { id },
        returning: true,
        plain: true,
      })
        .then((updatedCategory) => {
          res.status(statusCode.OK).json(updatedCategory[1]);
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
