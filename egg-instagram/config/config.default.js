'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545966125040_9743';

  // add your config here
  config.middleware = [
    'authorization',
  ];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.security = {
    csrf: false,
  };

  config.sequelize = {
    username: 'root',
    password: '12345678',
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
  };

  config.password_secret = 'test123test';

  config.jwt_secret = 'jwttestjwt';

  config.auth_cookie_name = 'jwt_token';

  config.cookie_domain = '127.0.0.1';

  config.authWhiteList = [ '/api/v2/passport/github', '/api/v2/passport/github/callback', '/api/v2/test', '/api/v2/login/register', '/api/v2/login' ];

  config.qiniu = {
    accessKey: 'oqRIRophqhd7aCZrP2NpQhtZnVhJMqf1n0QNSYrB',
    secretKey: 'h75t7twHo3SXSQ2dl4oedOW1J3vqtbptrV-z29I8',
    publicBucketDomain: 'http://pn49pgf9r.bkt.clouddn.com',
    options: {
      scope: 'instagram',
      expires: 7200,
    },
  };

  config.validatePlus = {
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.returnBody(400, '参数错误', {
          code: 400,
          error: errors,
          message: '参数错误',
        });
      }
    },
  };

  config.passportGithub = {
    key: 'ae19fe76010ef743db3a',
    secret: 'f32498c10011628ed217ddf4e64fa3a616d14830',
    callbackURL: '/api/v2/passport/github/callback',
    // proxy: false,
  };

  config.passportGithubPassword = 'test123';

  config.passportGithubSuccessRedirect = 'http://127.0.0.1:3000/#/';

  return config;
};
