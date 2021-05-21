const faker = require('faker');
const { Category } = require('../models');
const { Service } = require('../models');

const demoServicesCategories = [];

const generateDemoServicesCategories = async () => {
  const Categories = await Category.findAll({ attributes: ['id'] });
  const Services = await Service.findAll({ attributes: ['id'] });
  Services.forEach((service) => {
    demoServicesCategories.push({
      service_id: service.id,
      category_id: Categories[0].id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
  Services.forEach((service) => {
    demoServicesCategories.push({
      service_id: service.id,
      category_id: Categories[1].id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
  Services.forEach((service) => {
    demoServicesCategories.push({
      service_id: service.id,
      category_id: Categories[2].id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
};
module.exports = {
  up: async (queryInterface) => {
    await generateDemoServicesCategories();
    await queryInterface.bulkInsert('ServiceCategories', demoServicesCategories, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ServiceCategories', null, {});
  },
};
