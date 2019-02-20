'use strict';
module.exports = app => {
  const { INTEGER, STRING, DATE, NOW } = app.Sequelize;
  const Topic = app.model.define('topic', {
    topicId: { type: INTEGER(10), primaryKey: true, autoIncrement: true }, // 帖子id
    userId: { type: STRING(255) }, // 用户id
    topicTitle: { type: STRING(255), allowNull: true }, // 帖子标题
    topicImg: { type: STRING(1000), allowNull: false }, // 图片地址，
    address: { type: STRING(255), allowNull: true }, // 发表地址
    created_at: { type: DATE, defaultValue: NOW }, // 创建时间
    updated_at: { type: DATE, defaultValue: NOW }, // 更新时间
  }, {
    freezeTableName: true,
  });
  return Topic;
};
