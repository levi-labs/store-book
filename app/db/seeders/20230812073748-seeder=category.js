'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Business & Economics',
        user: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Art & Design',
        user: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Agriculture',
        user: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
