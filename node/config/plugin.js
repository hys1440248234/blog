'use strict';

// had enabled by egg
// exports.static = true;

// 视图模板
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// 开启cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
