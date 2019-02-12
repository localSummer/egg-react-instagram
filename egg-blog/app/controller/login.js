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
        domain: app.config.cookie_domain,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false,
      });
      ctx.returnBody(200, '登录成功');
    } else {
      ctx.returnBody(400, '邮箱或密码错误');
    }
  }

  async register() {
    const { ctx } = this;
    const { username, password, email } = ctx.request.body;
    await ctx.service.user.register({ username, password, email });
  }

  async signOut() {
    const { ctx, app } = this;
    ctx.cookies.set(app.config.auth_cookie_name, '');
    ctx.returnBody(200, '退出登录成功');
  }
}

module.exports = LoginController;

