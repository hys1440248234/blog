'use strict';
const Service = require('egg').Service;

/**
 * 标签服务类
 */
class TagService extends Service {
  /**
    * 根据条件查询一页数据
    * @param {object} query 查询条件
    * @return {object} 根据查询条件获得的数据
    */
  async findTags(query) {
    try {
      const results = await this.app.mysql.select('blog_tag', query);
      return results;
    } catch (err) {
      this.logger.error(err);
      return {};
    }
  }

  /**
   * 根据名字查询标签
   * @param {number} alias 查询的标签别名
   * @return {object} 根据名字查询得到的标签数据
   */
  async findOneTag(alias) {
    try {
      const data = await this.app.mysql.get('blog_tag', {
        alias,
      });
      return data;
    } catch (err) {
      this.logger.error(err);
      return {};
    }
  }

  /**
   * 创建新标签
   * @param {object} data 新标签数据
   * @return {number} 创建新标签成功为 1，否则为 0
   */
  async createTag(data) {
    try {
      const results = await this.app.mysql.insert('blog_tag', {
        ...data,
        update_time: this.app.mysql.literals.now,
        create_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.ctx.logger.error(err);
      return 0;
    }
  }

  /**
   * 更新标签数据
   * @param {object} data 更新的标签数据
   * @param {number} id 更新数据的id
   * @return {number} 更新新标签成功为 1，否则为 0
   */
  async updateTag(data, id) {
    try {
      const results = await this.app.mysql.update('blog_tag', {
        id,
        ...data,
        update_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.ctx.logger.error(err);
      return 0;
    }
  }

  /**
   * 删除标签数据
   * @param {number} id 删除标签的 id
   * @return {number} 删除新标签成功为 1，否则为 0
   */
  async destroyTag(id) {
    try {
      const results = await this.app.mysql.update('blog_tag', {
        id,
        update_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.ctx.logger.error(err);
      return 0;
    }
  }
}

module.exports = TagService;
