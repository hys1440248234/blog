'use strict';
const Controller = require('egg').Controller;

/**
 * 用户控制器
 */
class UserController extends Controller {
  /**
   * 登录
   */
  async login() {
    const request = this.ctx.request.body; // 传过来的参数
    const user = await this.ctx.service.user.findUser('admin');
    let result = null;
    if (user === null) {
      result = {
        code: 50000,
        message: '用户不存在',
      };
    } else {
      if (request.password === user.password) {
        result = {
          code: 20000,
          data: {
            toke: user.roles,
            name: user.username,
          },
        };
      } else {
        result = {
          code: 50000,
          message: '密码错误',
        };
      }
    }
    this.ctx.body = JSON.stringify(result);
  }

  /**
   * 获得 token 信息
   */
  async info() {
    const user = await this.ctx.service.user.findUser('admin');
    let result = null;
    if (user === null) {
      result = {
        code: 50000,
        message: '用户不存在',
      };
    } else {
      result = {
        code: 20000,
        data: {
          roles: [
            user.roles,
          ],
          name: user.username,
          avatar: user.avatar,
        },
      };
    }
    this.ctx.body = JSON.stringify(result);
  }

  /**
   * 退出登录
   */
  async loginout() {
    this.ctx.body = JSON.stringify({
      code: 20000,
    });
  }
}

module.exports = UserController;
