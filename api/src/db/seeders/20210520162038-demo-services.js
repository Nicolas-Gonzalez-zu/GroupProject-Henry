const faker = require('faker');

const demoServices = [
  {
    name: 'E-conomy Pro Account',
    price: 300.0,
    description: 'Professional finance control with unlimited access to premium tools and content',
    img_url: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  },
];

const generateDemoServices = async () => {
  demoServices.push({
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoServices.push({
    name: faker.finance.accountName(),
    price: faker.datatype.float(),
    description: faker.finance.accountName(),
    img_url: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoServices.push({
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
