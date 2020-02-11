'use strict';
const Controller = require('egg').Controller;

/**
 * 标签控制器
 */
class TagController extends Controller {
  /**
   * 获得所有标签
   */
  async index() {
    const data = await this.ctx.service.tag.findTags({
      limit: Number(this.ctx.query.limit),
      offset: Number(this.ctx.query.offset),
    });
    this.ctx.body = {
      data,
      code: 20000,
    };
  }

  /**
   * 查找某个标签
   */
  async show() {
    // 虽然这里使用的是 this.ctx.params.id 获取但是实际传入的是别名 alias
    const data = await this.ctx.service.tag.findOneTag(this.ctx.params.id);
    this.ctx.body = {
      data,
      code: 20000,
    };
  }

  /**
   * 创建新标签
   */
  async create() {
    const result = await this.ctx.service.tag.createTag(this.ctx.request.body);
    let data = null;
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '创建新标签失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 更新标签
   */
  async update() {
    const request = this.ctx.request.body;
    const id = Number(this.ctx.params.id);
    const result = await this.ctx.service.tag.updateTag(request, id);
    let data = null;
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '更新标签失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 删除标签
   */
  async destroy() {
    const result = await this.ctx.service.tag.destroyTag(this.ctx.params.id);
    let data = null;
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '更新标签失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

}

module.exports = TagController;
