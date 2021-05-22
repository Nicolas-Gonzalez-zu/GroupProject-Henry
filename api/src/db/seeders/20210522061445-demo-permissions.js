const faker = require('faker');

const demoPermissions = [];

const generateDemoPermissions = async () => {
  demoPermissions.push({
    name: 'Create',
    id_code: 12,
    status: true,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoPermissions.push({
    name: 'Edit',
    id_code: 23,
    status: true,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoPermissions.push({
    name: 'Delete',
    id_code: 34,
    status: true,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
  demoPermissions.push({
    name: 'Notify',
    id_code: 45,
    status: true,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
};

module.exports = {
  up: async (queryInterface) => {
    await generateDemoPermissions();
    await queryInterface.bulkInsert('Permissions', demoPermissions, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
