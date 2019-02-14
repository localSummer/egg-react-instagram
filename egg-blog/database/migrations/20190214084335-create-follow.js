'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // 用户关注表
    const { INTEGER, STRING, DATE, NOW } = Sequelize;
    await queryInterface.createTable('follow', {
      id: { type: INTEGER(10), primaryKey: true, autoIncrement: true }, // 关注id
      userId: { type: STRING(255) }, // 用户id
      followedId: { type: STRING(255) }, // 关注者id
      status: { type: INTEGER(1), allowNull: false }, // 关注状态 0:取消关注，1:已关注
      created_at: { type: DATE, defaultValue: NOW }, // 创建时间
      updated_at: { type: DATE, defaultValue: NOW }, // 更新时间
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('follow');
  },
};
