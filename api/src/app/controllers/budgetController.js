const express = require('express');
const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Budget.findAll({
    where: { customer_id: req.user.id },
  }).then((Budgets) => {
    if (Budgets) {
      res.status(200).json(Budgets);
    } else {
      res.status(200).json({ message: 'No data to Show' });
    }
  });
});

router.post('/add', (req, res) => {
  const Budget = req.body;
  Budget.customer_id = req.user.id;
  db.Budget.create(Budget)
    .then((w) => {
      res.status(201).json(w);
    })
    .catch((e) => {
      res.status(500).json({ message: e.message });
    });
});

router.put('/edit', (req, res) => {
  const { id } = req.body;
  if (id) {
    const update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.amount) update.amount = req.body.amount;
    if (update.name || update.amount) {
      db.Budget.update(update, {
        where: {
          id,
          customer_id: req.user.id,
        },
      })
        .then((w) => {
          res.status(201).json(w);
        })
        .catch((e) => {
          res.status(500).json({ message: e.message });
        });
    } else {
      res.status(400).json({ message: 'Please check data sent and try again' });
    }
  } else {
    res.status(400).json({ message: 'Please check data sent and try again' });
  }
});

router.put('/change-status', (req, res) => {
  const { id, status } = req.body;
  if (id && status !== null && status !== undefined && typeof status === 'boolean') {
    db.Budget.update(
      { status },
      {
        where: {
          id,
          customer_id: req.user.id,
        },
      },
    )
      .then((w) => {
        res.status(201).json(w);
      })
      .catch((e) => {
        res.status(500).json({ message: e.message });
      });
  } else {
    res.status(500).json({ message: 'Please check data sent and try again' });
  }
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    db.Budget.findOne({
      where: {
        id,
        customer_id: req.user.id,
      },
    })
      .then((w) => {
        if (w) {
          res.status(200).json(w);
        } else {
          res.status(404).json({ message: 'Budget not found' });
        }
      })
      .catch((e) => {
        res.status(500).json({ message: e.message });
      });
  } else {
    res.status(404).json({ message: 'Budget not found' });
  }
});

module.exports = router;
