'use strict';
const jwt = require('jsonwebtoken');

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    const existsUser = await ctx.model.User.findOne({
      where: { uid: user.id },
    });
    if (existsUser) {
      const token = jwt.sign({ userId: existsUser.userId }, app.config.jwt_secret, { expiresIn: '7d' });
      await ctx.service.user.setCookie(token);
      return existsUser;
    }
    // 调用 service 注册新用户
    const newUser = await ctx.service.user.commonRegister({
      username: user.name,
      password: app.config.passportGithubPassword,
      email: user.profile._json.email,
      provider: user.provider,
      uid: user.id,
      avatarUrl: user.photo,
      abstract: user.profile._json.bio,
    });
    const token = jwt.sign({ userId: newUser.userId }, app.config.jwt_secret, { expiresIn: '7d' });
    await ctx.service.user.setCookie(token);
    return newUser;
  });
};
