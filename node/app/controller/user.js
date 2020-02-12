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
    const user = await this.ctx.service.user.findUser(request.username);
    let result = null;
    if (user === null) {
      result = {
        code: 50000,
        message: '用户不存在',
      };
    } else {
      // 验证密码是否正确
      const isPassword = await this.ctx.service.user.verifyPassword(request.password, user.password);
      if (isPassword) {
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
   * 更改密码
   */
  async updatePassword() {
    const request = this.ctx.request.body; // 传过来的参数
    const user = await this.ctx.service.user.findUser(request.username);
    let result = null;
    if (user === null) {
      result = {
        code: 50000,
        message: '用户不存在',
      };
    } else {
      // 验证密码是否正确
      const isPassword = await this.ctx.service.user.verifyPassword(request.password, user.password);
      if (isPassword) {
        // 更改密码
        const isUpdate = await this.ctx.service.user.updatePassword(request);
        if (isUpdate) {
          result = {
            code: 20000,
          };
        } else {
          result = {
            code: 20000,
            message: '更改密码失败',
          };
        }
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
