const express = require('express');

const checkIfLoggedIn = require('../auth/authorizeMiddleware');
const db = require('../../db/models');
const { errorCode, statusCode } = require('../utils/globalCodes');

const router = express.Router();
router.use(checkIfLoggedIn);

router.get('/', (req, res) => {
  db.Service.findAll({
    include: { model: db.Category },
  })
    .then((foundServices) => {
      const processedServices = foundServices.map((service) => {
        const { id, name, price, description, img_url } = service.dataValues; // eslint-disable-line camelcase
        const categoriesContainer = service.dataValues.Categories.map((category) => ({
          id: category.dataValues.id,
          name: category.dataValues.name,
        }));

        return {
          id,
          name,
          price,
          description,
          img_url,
          categories: categoriesContainer,
        };
      });
      res.status(statusCode.OK).json(processedServices);
    })
    .catch(() => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
    });
});

module.exports = router;
