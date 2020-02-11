'use strict';
const Controller = require('egg').Controller;

/**
 * 文章控制器
 */
class ArticleController extends Controller {
  /**
   * 获取文章列表
   */
  async index() {
    const data = await this.ctx.service.article.findArticles({
      limit: Number(this.ctx.query.limit),
      offset: Number(this.ctx.query.offset),
    });
    this.ctx.body = {
      data,
      code: 20000,
    };
  }

  /**
   * 获取一篇文章信息
   */
  async show() {
    const data = await this.ctx.service.article.findOneArticle(this.ctx.params.id);
    this.ctx.body = {
      data,
      code: 20000,
    };
  }

  /**
   * 创建文章
   */
  async create() {
    const result = await this.ctx.service.article.createArticle(this.ctx.request.body);
    let data = null;
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '新增文章失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 更新文章
   */
  async update() {
    const request = this.ctx.request.body;
    const id = Number(this.ctx.params.id);
    const result = await this.ctx.service.article.updateArticle(request, id);
    let data = null;
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '更新文章失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 删除文章
   */
  async destroy() {
    const result = await this.ctx.service.article.destroyArticle(this.ctx.params.id);
    let data = null;
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '删除文章失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 文章总数
   */
  async count() {
    const count = await this.ctx.service.article.countArticle();
    this.ctx.body = JSON.stringify({
      count,
    });
  }

  /**
   * 喜欢某篇文章
   */
  async likeArticle() {
    const { like, id } = await this.ctx.query;
    let data = null;
    const result = await this.ctx.service.article.likeArticle({ like, id });
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '添加喜欢失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 浏览量增加
   */
  async addView() {
    const { view, id } = await this.ctx.query;
    let data = null;
    const result = await this.ctx.service.article.viewArticle({ view, id });
    if (result === 1) {
      data = {
        code: 20000,
      };
    } else {
      data = {
        code: 50000,
        message: '浏览量加一失败',
      };
    }
    this.ctx.body = JSON.stringify(data);
  }

  /**
   * 文章图片上传
   */
  async upload() {
    const files = await this.ctx.service.article.upload();
    const data = {
      code: 20000,
      files,
    };
    this.ctx.body = JSON.stringify(data);
  }
}

module.exports = ArticleController;
