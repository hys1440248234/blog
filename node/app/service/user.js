'use strict';
const Service = require('egg').Service;

/**
 * 用户服务类
 */
class UserService extends Service {
  /**
   * 根据用户名验证是否有该用户
   * @param {*} name 姓名
   * @return {object} 返回用户信息
   */
  async findUser(name) {
    try {
      const user = await this.app.mysql.get('blog_user', {
        username: name,
      });
      return user;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}

module.exports = UserService;
