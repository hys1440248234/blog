import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('api')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  /**
   * 根据条件查询一页数据
   * @param limit 一页的文章数
   * @param offset 偏移
   * @return {object} 某一页文章数据
   */
  @Get('article')
  async index(@Query('limit')limit: number, @Query('offset')offset: number) {
    const data = await this.articleService.findArticles(Number(limit), Number(offset));
    return {
      data,
      code: 20000,
    };
  }
}
