'use strict';
const Service = require('egg').Service;
const bcrypt = require('bcryptjs');

/**
 * 用户服务类
 */
class UserService extends Service {
  /**
   * 根据用户名验证是否有该用户
   * @param {*} username 用户名
   * @return {object} 返回用户信息
   */
  async findUser(username) {
    try {
      const user = await this.app.mysql.get('blog_user', {
        username,
      });
      return user;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /**
   * 更新密码
   * @param {object} request 请求 body
   */
  async updatePassword(request) {
    try {
      const password = await this.encryptPassword(request.password);
      this.app.mysql.update('blog_user', {
        id: request.id,
        password,
        update_time: this.app.mysql.literals.now,
      });
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /**
   * 加密密码
   * @param {string} password 密码
   */
  async encryptPassword(password) {
    try {
      const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      return hashPassword;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /**
   * 验证密码
   * @param {*} getPassword 前端提交的密码
   * @param {string} hashPassword 加密后的密码
   */
  async verifyPassword(getPassword, hashPassword) {
    try {
      return await bcrypt.compareSync(getPassword, hashPassword);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}

module.exports = UserService;
