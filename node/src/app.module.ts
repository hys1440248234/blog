import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ArticleModule, TagModule, UserModule, AdminModule, HomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
