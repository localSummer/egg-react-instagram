'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async loginIn() {
    const { ctx, app } = this;
    const { email, password } = ctx.request.body;

    const validateResult = await ctx.validate('login.signIn', { email, password });
    if (!validateResult) {
      // 验证失败必须return阻止后续代码执行，因为validatePlus中resolveError是异步执行的，他是在当前代码流程执行完毕后才执行的
      return;
    }

    const loginInfo = await ctx.service.user.login({ password, email });
    if (loginInfo.token) {
      ctx.cookies.set(app.config.auth_cookie_name, loginInfo.token, {
        path: '/',
        domain: app.config.cookie_domain,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false,
      });
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
    ctx.returnBody(200, '退出登录成功');
  }
}

module.exports = LoginController;

