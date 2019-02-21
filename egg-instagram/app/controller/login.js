'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async loginIn() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;

    // 登录表单字段验证
    const validateResult = await ctx.validate('login.signIn', { email, password });
    if (!validateResult) {
      return;
    }

    const loginInfo = await ctx.service.user.login({ password, email });
    if (loginInfo.token) {
      await ctx.service.user.setCookie(loginInfo.token);
      ctx.returnBody(200, '登录成功', loginInfo.userId);
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
    ctx.session = null;
    ctx.returnBody(200, '退出登录成功');
  }
}

module.exports = LoginController;

