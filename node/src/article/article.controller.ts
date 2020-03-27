import { Controller, Get, Query, Header, Param, Body, Post, Logger, Put, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleData } from './article.interface';

/**
 * 文章服务类
 */
@Controller('api')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  /**
   * 根据条件查询一页数据
   * @param limit 一页的文章数
   * @param offset 偏移
   * @return 某一页文章数据
   */
  @Get('article')
  @Header('Content-Type', 'application/json')
  async index(@Query('limit') limit: number, @Query('offset') offset: number) {
    const data = await this.articleService.findArticles(Number(limit), Number(offset));
    return JSON.stringify({
      data,
      code: 20000,
    });
  }

  /**
   * 获取一篇文章信息
   * @param id 某一篇的ID
   * @return 某一篇文章数据
   */
  @Get('article/:id')
  @Header('Content-Type', 'application/json')
  async show(@Param('id') id: number) {
    const data = await this.articleService.findOneArticle(id);
    return JSON.stringify({
      data,
      code: 20000,
    });
  }

  /**
   * 创建文章
   * @param id 某一篇的ID
   * @return 某一篇文章数据
   */
  @Post('article')
  @Header('Content-Type', 'application/json')
  async create(@Body()body: ArticleData) {
    const result = await this.articleService.createArticle(body);
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
    return JSON.stringify(data);
  }

  /**
   * 更新文章
   * @param body 新的文章
   * @param id 某一篇的ID
   * @return 某一篇文章数据
   */
  @Put('article/:id')
  @Header('Content-Type', 'application/json')
  async update(@Body()body: ArticleData, @Param('id')id: number) {
    const result = await this.articleService.updateArticle(body, id);
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
    return JSON.stringify(data);
  }

  /**
   * 删除文章
   */
  @Delete('article/:id')
  @Header('Content-Type', 'application/json')
  async destroy(@Param('id')id: number) {
    const result = await this.articleService.destroyArticle(id);
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
    return JSON.stringify(data);
  }

  /**
   * 获得文章总数
   */
  @Get('articleCount')
  @Header('Content-Type', 'application/json')
  async count() {
    const count = await this.articleService.countArticle();
    return JSON.stringify({
      data: count,
      code: 20000,
    });
  }

  /**
   * 喜欢某篇文章
   * @param id ID
   * @param like 新的喜欢数
   */
  @Get('like')
  @Header('Content-Type', 'application/json')
  async likeArticle(@Query('like')like: number, @Query('id')id: number) {
    const result = await this.articleService.likeArticle(like, id);
    let data = null;
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
    return JSON.stringify(data);
  }

  /**
   * 浏览量增加
   * @param id ID
   * @param view 新的浏览数
   */
  @Get('view')
  @Header('Content-Type', 'application/json')
  async addView(@Query('view')view: number, @Query('id')id: number) {
    const result = await this.articleService.viewArticle(id, view);
    let data = null;
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
    return JSON.stringify(data);
  }

  /**
   * 文章图片上传
   */
  async upload() {
    const files = await this.articleService.upload();
    const data = {
      code: 20000,
      files,
    };
    return JSON.stringify(data);
  }
}
