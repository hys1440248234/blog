import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleMoudle } from './article/article.module';
import { TagMoudle } from './tag/tag.module';
import { UserMoudle } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ArticleMoudle, TagMoudle, UserMoudle],
  controllers: [],
  providers: [],
})
export class AppModule {}
