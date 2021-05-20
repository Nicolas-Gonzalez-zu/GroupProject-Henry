const faker = require('faker');

const demoCategories = [];

const generateDemoCategories = async () => {
  demoCategories.push({
    name: faker.commerce.department(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoCategories.push({
    name: faker.commerce.department(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoCategories.push({
    name: faker.commerce.department(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoCategories.push({
    name: faker.commerce.department(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoCategories.push({
    name: faker.commerce.department(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
};

module.exports = {
  up: async (queryInterface) => {
    await generateDemoCategories();
    await queryInterface.bulkInsert('Categories', demoCategories, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
