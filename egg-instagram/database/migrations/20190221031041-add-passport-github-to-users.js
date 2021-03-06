'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { STRING } = Sequelize;
    await queryInterface.addColumn('users', 'provider', {
      type: STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'uid', {
      type: STRING(255),
      allowNull: true,
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeColumn('users', 'provider');
    await queryInterface.removeColumn('users', 'uid');
  },
};
