const faker = require('faker');

const demoServices = [
  {
    id: 1,
    name: 'Pro Account',
    price: 300.0,
    description: 'Professional finance control with unlimited access to premium tools and content',
    img_url: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  },
];

const generateDemoServices = async () => {
  demoServices.push({
    id: 2,
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoServices.push({
    id: 3,
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoServices.push({
    id: 4,
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: null,
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
