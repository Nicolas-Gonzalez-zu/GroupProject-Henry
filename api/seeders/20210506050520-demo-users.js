const faker = require('faker');

const generateDemoUsers = (cuantity) => {
  const demoUsers = [];
  for (let i = 1; i <= cuantity; i += 1) {
    demoUsers.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  }
  return demoUsers;
};

module.exports = {
  up: async (queryInterface) => {
    const Users = await generateDemoUsers(10);
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Users', Users, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
