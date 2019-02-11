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
      ctx.status = 200;
      ctx.body = {
        flag: false,
        msg: '邮箱已被使用',
      };
      return;
    }
    user.password = crypto.createHmac('sha256', app.config.password_secret)
      .update(user.password)
      .digest('hex');
    const userInfo = await ctx.model.User.create(user);
    ctx.status = 200;
    ctx.body = {
      flag: true,
      msg: '注册成功',
      userId: userInfo.userId,
    };
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
      return null;
    }
    const passHash = existUser.password;
    const isEqual = passHash === crypto.createHmac('sha256', app.config.password_secret).update(user.password).digest('hex');
    if (!isEqual) {
      return false;
    }
    const token = jwt.sign({ userId: existUser.userId }, app.config.jwt_secret, { expiresIn: '7d' });
    return token;
  }

  async getUserByMail(email) {
    return this.ctx.model.User.findOne({
      where: {
        email,
      },
    });
  }
}
module.exports = UserService;
