import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly artilceRepository: Repository<Article>,
    ) {}
    async findArticles(limit: number, offset: number) {
        try {
            return await this.artilceRepository
            .find({
                skip: offset,
                take: limit,
            });
        } catch (error) {
            Logger.error(error);
        }
    }
}
