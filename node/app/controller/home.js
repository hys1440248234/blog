'use strict';
const Controller = require('egg').Controller;

/**
 * 前台页面
 */
class HomeController extends Controller {
  /**
   * 返回主页
   */
  async index() {
    await this.ctx.render('home.html');
  }
}

module.exports = HomeController;
