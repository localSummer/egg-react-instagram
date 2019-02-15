'use strict';
const Controller = require('egg').Controller;

class FriendController extends Controller {
  async follow() {
    const { ctx } = this;
    const { userId, status } = ctx.request.body;
    const followedId = ctx.user.userId;
    const followMsg = {
      userId,
      followedId,
      status,
    };
    await ctx.service.follow.followUser(followMsg);
    ctx.returnBody(200, status === 1 ? '关注成功' : '取消成功');
  }

  async notFollowList() {
    const { ctx } = this;
    const userId = ctx.user.userId;
    const friendList = await ctx.service.user.getUnFollowUserList(userId);
    ctx.returnBody(200, '获取成功', friendList);
  }
}

module.exports = FriendController;
