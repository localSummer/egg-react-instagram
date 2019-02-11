'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const apiV2Router = app.router.namespace('/api/v2');
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/news/:id', controller.news.item);
  router.get('/api', controller.api.index);

  apiV2Router.post('/login/register', controller.login.register);
  apiV2Router.post('/login', controller.login.loginIn);
};
