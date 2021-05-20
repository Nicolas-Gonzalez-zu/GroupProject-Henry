const faker = require('faker');

const demoServices = [];

const generateDemoServices = async () => {
  demoServices.push({
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: faker.finance.accountName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoServices.push({
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: faker.finance.accountName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoServices.push({
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: faker.finance.accountName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
};
module.exports = {
  up: async (queryInterface) => {
    await generateDemoServices();
    await queryInterface.bulkInsert('Services', demoServices, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
