'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const apiV2Router = app.router.namespace('/api/v2');

  // 页面测试使用
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/news/:id', controller.news.item);

  // api v2 接口测试
  apiV2Router.get('/test', controller.api.index);

  // login
  apiV2Router.post('/login/register', controller.login.register); // 注册
  apiV2Router.post('/login', controller.login.loginIn); // 登录
  apiV2Router.get('/login/signout', controller.login.signOut); // 退出登录

  // user
  apiV2Router.get('/user/info', controller.user.userInfo); // 获取登录用户信息
};
