const faker = require('faker');
const { Customer } = require('../models');

const demoWallets = [];

const generateDemoWallets = async (quantity) => {
  const Customers = await Customer.findAll({ attributes: ['user_id'] });
  for (let i = 0; i < quantity; i += 1) {
    Customers.forEach((c) => {
      demoWallets.push({
        name: faker.finance.accountName(),
        balance: faker.datatype.number(),
        customer_id: c.user_id,
        status: true,
        createdAt: faker.date.past(),
        updatedAt: faker.date.future(),
      });
    });
  }
};
module.exports = {
  up: async (queryInterface) => {
    await generateDemoWallets(3);
    await queryInterface.bulkInsert('Wallets', demoWallets, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Wallets', null, {});
  },
};
