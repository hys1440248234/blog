import { Controller, Get, Render } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Get('/')
  @Render('index')
  home() {
    return this.articleService.home();
  }
}
