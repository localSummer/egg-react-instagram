'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async loginIn() {
    const { ctx, app } = this;
    const { email, password } = ctx.request.body;
    const token = await ctx.service.user.login({ password, email });
    if (token) {
      ctx.cookies.set(app.config.auth_cookie_name, token, {
        path: '/',
        domain: '127.0.0.1',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false,
      });
      ctx.status = 200;
      ctx.body = {
        msg: '登录成功',
        flag: true,
      };
    } else {
      ctx.throw(400, '邮箱或密码错误');
    }
  }

  async register() {
    const { ctx } = this;
    const { username, password, email } = ctx.request.body;
    await ctx.service.user.register({ username, password, email });
  }
}

module.exports = LoginController;

