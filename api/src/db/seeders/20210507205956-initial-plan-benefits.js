const faker = require('faker');

const initialPlanBenefitsDetails = [
  {
    plan_id: 2,
    benefit_id: 1,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    plan_id: 2,
    benefit_id: 2,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    plan_id: 1,
    benefit_id: 3,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
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
    await queryInterface.bulkInsert('PlanBenefits', initialPlanBenefitsDetails);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PlanBenefits', null, {});
  },
};
