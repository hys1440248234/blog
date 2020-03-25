import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleMoudle } from './article/article.module';
import { TagMoudle } from './tag/tag.module';
import { UserMoudle } from './user/user.module';
import { AdminController } from './admin/admin.controller';
import { HomeController } from './home/home.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), ArticleMoudle, TagMoudle, UserMoudle],
  controllers: [AdminController, HomeController],
  providers: [],
})
export class AppModule {}
