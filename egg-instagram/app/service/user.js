'use strict';
const Service = require('egg').Service;
const uuid = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UserService extends Service {
  async register(user) {
    const { ctx, app } = this;
    user.userId = uuid.v4().replace(/-/g, '');
    const queryResult = await this.hasRegister(user.email);
    if (queryResult) {
      ctx.returnFalseBody(200, '邮箱已被使用');
      return;
    }
    user.password = crypto.createHmac('sha256', app.config.password_secret)
      .update(user.password)
      .digest('hex');
    const userInfo = await ctx.model.User.create(user);
    ctx.returnBody(200, '注册成功', userInfo.userId);
  }

  async hasRegister(email) {
    const user = await this.ctx.model.User.findOne({
      where: { email },
    });
    if (user && user.userId) {
      return true;
    }
    return false;
  }

  async login(user) {
    const { app } = this;
    const existUser = await this.getUserByMail(user.email);
    if (!existUser) {
      return false;
    }
    const passHash = existUser.password;
    const isEqual = passHash === crypto.createHmac('sha256', app.config.password_secret).update(user.password).digest('hex');
    if (!isEqual) {
      return false;
    }
    const token = jwt.sign({ userId: existUser.userId }, app.config.jwt_secret, { expiresIn: '7d' });
    return {
      token,
      userId: existUser.userId,
    };
  }

  async getUserByMail(email) {
    return await this.ctx.model.User.findOne({
      where: {
        email,
      },
    });
  }

  async getUserByUserId(userId) {
    return await this.ctx.model.User.findOne({
      where: {
        userId,
      },
    });
  }

  async updateUserInfo(query, updateValue) {
    const { ctx } = this;
    return await ctx.model.User.update(updateValue, {
      where: query,
    });
  }

  async getUnFollowUserList(userId) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    // 查询已关注用户
    let followList = await ctx.model.Follow.findAll({
      attributes: [ 'userId' ],
      where: {
        followedId: userId,
        status: 1,
      },
    });
    followList = followList.map(item => item.userId);
    return await ctx.model.User.findAll({
      attributes: [ 'userId', 'username', 'email', 'avatarUrl', 'abstract' ],
      where: {
        userId: {
          [Op.ne]: userId,
          [Op.notIn]: followList,
        },
      },
    });
  }
}
module.exports = UserService;
