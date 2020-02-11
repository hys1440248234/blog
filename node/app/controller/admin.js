'use strict';
const Controller = require('egg').Controller;

/**
 * 管理页面控制器
 */
class AdminController extends Controller {
  /**
   * 返回管理页
   */
  async index() {
    await this.ctx.render('admin.html');
  }
}

module.exports = AdminController;
