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

router.post('/add', (req, res) => {
  const service = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    img_url: req.body.img_url,
  };

  db.Service.create(service)
    .then((createdService) => {
      req.body.categories.forEach((category) => {
        createdService.addCategory(category);
      });
      res.status(statusCode.CREATED).json(createdService);
    })
    .catch((error) => {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });
});

router.put('/edit', (req, res) => {
  let savedService;
  const { service_id, name, price, description, img_url, modifiedCategories } = req.body; // eslint-disable-line camelcase
  const modifiedService = {};
  if (name) modifiedService.name = name;
  if (price) modifiedService.price = price;
  if (description) modifiedService.description = description;
  if (img_url) modifiedService.img_url = img_url; // eslint-disable-line camelcase
  // eslint-disable-next-line camelcase
  if (service_id) {
    db.Service.update(modifiedService, {
      where: { id: +service_id }, // eslint-disable-line camelcase
      returning: true,
      plain: true,
    })
      .then((updatedService) => {
        if (updatedService[0] !== 0) {
          savedService = updatedService;
        } else {
          savedService = [null, { message: 'Hola mundo' }];
        }
        return db.Service.findOne({
          where: { id: +service_id }, // eslint-disable-line camelcase
          include: { model: db.Category },
        });
      })
      .then((foundService) => {
        const oldCategories = modifiedCategories.oldCategories.sort((x, y) => x - y).join('');
        const newCategories = modifiedCategories.newCategories.sort((x, y) => x - y).join('');

        if (oldCategories !== newCategories) {
          modifiedCategories.oldCategories.forEach((oldCategory) => {
            foundService.removeCategory(oldCategory);
          });
          modifiedCategories.newCategories.forEach((newCategory) => {
            foundService.addCategory(newCategory);
          });
        }
        res.status(statusCode.OK).json(savedService[1]);
      })
      .catch(() => {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: errorCode.REJECTED_OPERATION });
      });
  } else {
    res.status(statusCode.BAD_REQUEST).json({ error: errorCode.MISSING_ATTRIBUTES });
  }
});

module.exports = router;
