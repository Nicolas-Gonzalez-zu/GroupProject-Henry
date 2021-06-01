const faker = require('faker');
const { permissions } = require('./20210531220604-initial-permissions');

const initialRolsPermissions = [
  {
    rol_id: 1,
    permission_id: 1,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];

for (let i = 1; i < permissions.length; i += 1) {
  initialRolsPermissions.push({
    rol_id: 2,
    permission_id: i + 1,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });
}

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('RolPermissions', initialRolsPermissions);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('RolPermissions', null, {});
  },
};
