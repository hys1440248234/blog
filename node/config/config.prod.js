'use strict';

module.exports = () => {
  const config = exports = {};

  config.security = {
    csrf: {
      enable: true, // 上线环境开启 CSRF
    },
  };

  return config;
};
