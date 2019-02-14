'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // 帖子发布表
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('topic', {
      topicId: { type: INTEGER(10), primaryKey: true, autoIncrement: true }, // 帖子id
      userId: { type: STRING(255) }, // 用户id
      topicTitle: { type: STRING(255), allowNull: true }, // 帖子标题
      topicImg: { type: STRING(1000), allowNull: false }, // 图片地址，
      address: { type: STRING(255), allowNull: true }, // 发表地址
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
    await queryInterface.dropTable('topic');
  },
};
