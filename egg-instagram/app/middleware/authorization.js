'use strict';
module.exports = (options, app) => {
  return async function(ctx, next) {
    let url = ctx.url;
    if (url.indexOf('?') > -1) {
      url = ctx.url.substring(0, ctx.url.indexOf('?'));
    }
    if (app.config.authWhiteList.indexOf(url) !== -1) {
      await next(options);
      return;
    }
    if (ctx.cookies.get(app.config.auth_cookie_name)) {
      const token = ctx.cookies.get(app.config.auth_cookie_name);
      try {
        ctx.jwt.verify(token, app.config.jwt_secret);
      } catch (e) {
        ctx.returnBody(401, '未登录，禁止访问');
      }
      await next(options);
    } else {
      ctx.returnBody(401, '未登录，禁止访问');
    }
  };
};
