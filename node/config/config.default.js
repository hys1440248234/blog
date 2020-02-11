'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // 用于cookie签名的密钥，应更改为您自己的并保持安全
  config.keys = appInfo.name + '_wenhua_20190221';

  // 在这里添加你的配置
  config.middleware = [];

  // 视图模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.security = {
    csrf: {
      enable: false, // 本地开发时跨域，此时 CSRF 用不了，关闭 CSRF
    },
    domainWhiteList: [
      '.mainhou.com', // 防止钓鱼攻击的安全白名单，以 . 开头，允许跳转至 .mainhou.com'
    ],
  };

  // 允许所有方法跨域
  config.cors = {
    origin: 'http://localhost:9528',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 静态文件解析
  config.static = {
    prefix: '/',
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
    ],
  };

  // mysql
  exports.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 指定启动配置
  config.cluster = {
    listen: {
      port: 3000,
    },
  };

  // 文件上传
  config.multipart = {
    // 设置支持的上传文件类型
    whitelist: [ '.ppt', '.pptx', 'docx', '.doc', '.pdf', '.xsl', '.xslx', '.zip', '.jpg', '.svg', '.webp', '.png', '.jpeg' ],
    // 设置最大可以上传300M
    fileSize: '300mb',
  };

  // 404 页面
  config.notfound = {
    pageUrl: '/404',
  };

  return config;
};
