'use strict';
const Service = require('egg').Service;

class FollowService extends Service {
  async followUser(followUser) {
    const { ctx } = this;
    const result = await ctx.model.Follow.findOne({
      userId: followUser.userId,
      followedId: followUser.followedId,
    });
    return (result ? await result.update(followUser) : await ctx.model.Follow.create(followUser));
  }

  // 查询用户关注的列表
  async findFollow(query) {
    const { ctx } = this;
    return await ctx.model.Follow.findAll({
      where: query,
    });
  }

  // 查询用户关注数量
  async findFollowCounts(query) {
    const { ctx } = this;
    return await ctx.model.Follow.findAndCountAll({
      where: query,
    });
  }
}

module.exports = FollowService;
