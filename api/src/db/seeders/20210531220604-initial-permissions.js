const faker = require('faker');
const orderPermissions = require('./schemas/permissions/orderModule');
const customerPermissions = require('./schemas/permissions/customerModule');
const servicePermissions = require('./schemas/permissions/serviceModule');
const categoryPermissions = require('./schemas/permissions/categoryModule');

let initialPermissions = [
  {
    name: 'Super Admin',
    id_code: 'ALL_PERMISSIONS',
    id: 1,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
initialPermissions = initialPermissions.concat(orderPermissions);
initialPermissions = initialPermissions.concat(customerPermissions);
initialPermissions = initialPermissions.concat(servicePermissions);
initialPermissions = initialPermissions.concat(categoryPermissions);

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Permissions', initialPermissions, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
  permissions: initialPermissions,
};
