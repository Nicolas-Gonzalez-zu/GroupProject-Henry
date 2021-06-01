const faker = require('faker');
const bcryptUtils = require('../../app/utils/bcryptUtils');
const { User } = require('../models');

const demoEmployees = [];

const demoEmployeeUser = [
  {
    first_name: 'Admin',
    last_name: 'testing',
    phone: '+575545454',
    email: 'admin@economy.com',
    password: bcryptUtils.encrypt('123456789Em'),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  },
  {
    first_name: 'Employee',
    last_name: 'testing',
    phone: '+575545454',
    email: 'employee@economy.com',
    password: bcryptUtils.encrypt('123456789Em'),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  },
];

const generateDemoCustomers = async () => {
  let rol = 1;
  for (let i = 0; i < demoEmployeeUser.length; i += 1) {
    if (i > 0) {
      rol = 2;
    }
    try {
      // eslint-disable-next-line no-await-in-loop
      const user = await User.create(demoEmployeeUser[i]);
      demoEmployees.push({
        user_id: user.id,
        rol_id: rol,
        createdAt: faker.date.past(),
        updatedAt: faker.date.future(),
      });
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = {
  up: async (queryInterface) => {
    await generateDemoCustomers();
    await queryInterface.bulkInsert('Employees', demoEmployees, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Employees', null, {});
    await User.destroy({ where: { email: 'admin@economy.com' } });
    await User.destroy({ where: { email: 'employee@economy.com' } });
  },
};
