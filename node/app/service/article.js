'use strict';
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const Service = require('egg').Service;

/**
 * 文章服务类
 */
class ArticleService extends Service {
  /**
   * 根据条件查询一页数据
   * @param {object} query 查询条件
   * @return {object} 某一页文章数据
   */
  async findArticles(query) {
    try {
      const results = await this.app.mysql.select('blog_article', query);
      return results;
    } catch (err) {
      this.logger.error(err);
      return {};
    }
  }

  /**
   * 根据 id 查询一条数据
   * @param {number} id ID
   * @return {object} 某个文章数据
   */
  async findOneArticle(id) {
    try {
      const results = await this.app.mysql.get('blog_article', {
        id,
      });
      return results;
    } catch (err) {
      this.logger.error(err);
      return {};
    }
  }

  /**
    * 插入数据
    * @param {*} data 插入的文章数据
    * @return {number} 插入成功为 1，否则为 0
    */
  async createArticle(data) {
    try {
      data.create_time = new Date(data.create_time);
      data.update_time = new Date(data.update_time);
      const results = await this.app.mysql.insert('blog_article', {
        ...data,
        update_time: this.app.mysql.literals.now,
        create_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.logger.error(err);
      return 0;
    }
  }

  /**
    * 更新文章
    * @param {object} data 文章新的数据
    * @param {number} id 更新数据的 id
    * @return {number} 更新成功为 1，否则为 0
    */
  async updateArticle(data, id) {
    try {
      data.create_time = new Date(data.create_time);
      data.update_time = new Date(data.update_time);
      const results = await this.app.mysql.update('blog_article', {
        id,
        ...data,
        update_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.logger.error(err);
      return 0;
    }
  }

  /**
    * 删除指定文章
    * @param {number} id 删除文章的 id
    * @return {number} 删除成功为 1，否则为 0
    */
  async destroyArticle(id) {
    try {
      const results = await this.app.mysql.update('blog_article', {
        id,
        update_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.logger.error(err);
      return 0;
    }
  }

  /**
   * 文章总数
   * @return {object} 文章总数
   */
  async countArticle() {
    try {
      const count = await this.app.mysql.count('blog_article', {});
      return count;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  /**
   * 喜欢某篇文章
   * @param {object} data 文章数据
   * @return {number} 成功为 1，否则为 0
   */
  async likeArticle(data) {
    try {
      const results = await this.app.mysql.update('blog_article', {
        ...data,
        update_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.logger.error(err);
      return 0;
    }
  }

  /**
   * 文章浏览量加一
   * @param {object} data 文章数据
   * @return {number} 浏览量增加成功为 1，否则为 0
   */
  async viewArticle(data) {
    try {
      data.create_time = new Date(data.create_time);
      data.update_time = new Date(data.update_time);
      const results = await this.app.mysql.update('blog_article', {
        ...data,
        update_time: this.app.mysql.literals.now,
      });
      if (results.affectedRows === 1) {
        return 1;
      }
      return 0;
    } catch (err) {
      this.logger.error(err);
      return 0;
    }
  }

  /**
   * 文章首图上传
   * @return {array} 上传后图片的路径
   */
  async upload() {
    try {
      const parts = this.ctx.multipart({ autoFields: true });
      const files = [];
      let stream;
      while ((stream = await parts()) != null) {
        // 获取最后一个.的位置
        const index = stream.filename.lastIndexOf('.');
        // 获取后缀
        const ext = stream.filename.substr(index);
        const newName = Math.floor(Math.random() * 1000 + Number(new Date())) + `${ext}`;
        const target = path.join(this.config.baseDir, 'app/public/img/', newName);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        files.push('/img/' + newName);
      }
      return files;
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }
}

module.exports = ArticleService;
