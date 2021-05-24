const express = require('express');
const Sequelize = require('sequelize');

const op = Sequelize.Op;

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  let processedEmployees = [];

  db.User.findAll({
    include: {
      model: db.Employee,
      as: 'employee',
      where: {
        user_id: { [op.col]: 'User.id' },
      },
    },
  })
    .then((foundEmployees) => {
      const organizedEmployees = foundEmployees.map((foundEmployee) => {
        // eslint-disable-next-line camelcase
        const { id, first_name, last_name, email, employee } = foundEmployee.dataValues;
        // eslint-disable-next-line camelcase
        const { rol_id } = employee.dataValues;
        return {
          id,
          first_name,
          last_name,
          email,
          rol_id,
          rol_name: '',
          permissions: [],
        };
      });
      return organizedEmployees;
    })
    .then((organizedEmployees) => {
      processedEmployees = [...organizedEmployees];
      const foundRols = organizedEmployees.map((processedEmployee) =>
        db.Rol.findAll({
          where: { id: +processedEmployee.rol_id },
          include: { model: db.Permission },
        }),
      );
      return Promise.all(foundRols);
    })
    .then((foundRols) => {
      const processedRols = foundRols.map((results) => results[0]);
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < processedEmployees.length; x++) {
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < processedRols.length; y++) {
          if (processedEmployees[x].rol_id === processedRols[y].id) {
            processedEmployees[x].rol_name = processedRols[y].name;
            const processedPermissions = processedRols[y].Permissions.map((permission) => ({
              name: permission.name,
              id_code: permission.id_code,
              status: permission.status,
            }));
            processedEmployees[x].permissions = processedPermissions;
          }
        }
      }

      res.status(statusCode.CREATED).json(processedEmployees);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

router.post('/add', (req, res) => {
  const employee = req.body;
  db.Employee.create(employee)
    .then((createdEmployee) => {
      res.status(statusCode.CREATED).json(createdEmployee);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

module.exports = router;
