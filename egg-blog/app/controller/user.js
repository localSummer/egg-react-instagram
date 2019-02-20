'use strict';
const Controller = require('egg').Controller;
const crypto = require('crypto');

class UserController extends Controller {
  async userInfo() {
    const { ctx } = this;
    const userId = ctx.query.userId || ctx.user.userId;
    const user = await ctx.service.user.getUserByUserId(userId);
    const userInfo = {
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      abstract: user.abstract,
      account: user.email.replace(/@.*/, ''),
      mobile: user.mobile,
      website: user.website,
      sex: user.sex,
      userId: user.userId,
    };
    ctx.returnBody(200, '获取成功', userInfo);
  }

  async updateUserInfo() {
    const { ctx, app } = this;
    const contentBody = ctx.request.body;
    const userId = ctx.user.userId;
    // 更新已使用的他人邮箱地址
    if (contentBody.email) {
      const result = await ctx.service.user.getUserByMail(contentBody.email);
      if (result) {
        const currentUser = await ctx.service.user.getUserByUserId(userId);
        if (result.email === currentUser.email) {
          Reflect.deleteProperty(contentBody, 'email');
        } else {
          ctx.returnBody(400, '该邮箱已被其他账户使用');
          return;
        }
      }
    }
    // 密码校验不通过
    const result = await ctx.service.user.getUserByUserId(userId);
    if (contentBody.password && result) {
      const password = crypto.createHmac('sha256', app.config.password_secret).update(contentBody.password).digest('hex');
      if (result.password !== password) {
        ctx.returnBody(400, '旧密码填写不正确');
        return;
      }
      contentBody.password = crypto.createHmac('sha256', app.config.password_secret).update(contentBody.newPassword).digest('hex');
    }
    // 执行修改操作
    await ctx.service.user.updateUserInfo({ userId }, contentBody);
    // 已更改密码，让用户重新登录
    if (contentBody.password) {
      ctx.cookies.set(this.config.auth_cookie_name, '');
      ctx.returnBody(200, '密码更新成功，请重新登录');
    } else {
      ctx.returnBody(200, '更新成功');
    }
  }

  async userPersonalInfo() {
    const { ctx } = this;
    const userId = ctx.query.userId || ctx.user.userId;
    // 用户贴子
    const topics = await ctx.service.topic.queryTopicCounts({
      userId,
    });
    // 获取所有贴子的详情
    const topicList = [];
    for (const topic of topics.rows) {
      const item = await ctx.service.topic.topicDetailHander(topic.topicId);
      topicList.push(item);
    }
    // 用户粉丝
    const fansCounts = await ctx.service.follow.findFollowCounts({
      userId,
      status: 1,
    });
    // 用户关注数
    const followCounts = await ctx.service.follow.findFollowCounts({
      followedId: userId,
      status: 1,
    });
    // 非本人查询,是否关注了别人
    let followList = [];
    // 查询已关注用户
    const isSelf = !ctx.query.userId || ctx.query.userId === ctx.user.userId;
    if (!isSelf) {
      followList = await ctx.model.Follow.findAll({
        attributes: [ 'userId' ],
        where: {
          followedId: ctx.user.userId,
          userId: ctx.query.userId,
          status: 1,
        },
      });
    }
    ctx.returnBody(200, '获取成功', {
      topic: {
        counts: topics.count,
        topicList,
      },
      followCounts: followCounts.count,
      fansCounts: fansCounts.count,
      isSelf,
      hasFollow: followList.length > 0,
    });
  }
}

module.exports = UserController;
