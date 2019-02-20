'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // 帖子点赞表
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('topic-like', {
      id: { type: INTEGER(10), primaryKey: true, autoIncrement: true }, // 帖子id
      topicId: { type: INTEGER(10) },
      userId: { type: STRING(255) }, // 用户id
      status: { type: INTEGER(1) }, // 帖子状态1: 点赞 0: 取消点赞
      created_at: { type: DATE, defaultValue: NOW }, // 回复创建时间
      updated_at: { type: DATE, defaultValue: NOW }, // 回复创建时间
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('topic-like');
  },
};
