'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 管理页面渲染
  router.get([ '/admin', '/admin/*' ], controller.admin.index);
  // 展示页面渲染
  router.get([ '/', '/about', '/article/*', '/404' ], controller.home.index);
  // 账号数据接口
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/loginout', controller.user.loginout);
  router.get('/api/user/info', controller.user.info);
  // 文章数据接口
  router.resources('article', '/api/article', controller.article);
  router.get('/api/articleCount', controller.article.count);
  router.get('/api/like', controller.article.likeArticle);
  router.get('/api/view', controller.article.addView);
  router.post('/api/upload', controller.article.upload);
  // 标签数据接口
  router.resources('tag', '/api/tag', controller.tag);
};
