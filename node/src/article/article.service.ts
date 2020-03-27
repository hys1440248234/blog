import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleData } from './article.interface';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly artilceRepository: Repository<Article>,
    ) {}
    /**
     * 根据条件查询一页数据
     * @param limit 一页的文章数
     * @param offset 偏移
     * @return 某一页文章数据
     */
    async findArticles(limit: number, offset: number) {
        try {
            return await this.artilceRepository
                .find({
                    skip: offset,
                    take: limit,
                });
        } catch (error) {
            Logger.error(error);
            return {};
        }
    }

    /**
     * 根据 id 查询一条数据
     * @param id 查询文章的ID
     * @return 某个文章数据
     */
    async findOneArticle(id: number) {
        try {
            return await this.artilceRepository.findOne(id);
        } catch (err) {
            Logger.error(err);
            return {};
        }
    }

    /**
     * 插入数据
     * @param data 插入的文章数据
     * @return 插入成功为 1，否则为 0
     */
    async createArticle(data: ArticleData) {
        try {
            const article = await this.artilceRepository.create(data);
            const result = await this.artilceRepository.save(article);
            return 1;
        } catch (err) {
            Logger.error(err);
            return 0;
        }
    }

    /**
     * 更新文章
     * @param data 文章新的数据
     * @param id 更新数据的 id
     * @return 更新成功为 1，否则为 0
     */
    async updateArticle(data: ArticleData, id: number) {
        try {
            data.updateTime = new Date();
            const result = await this.artilceRepository.update(id, data);
            return result.raw.affectedRows > 0 ? 1 : 0;
        } catch (err) {
            Logger.error(err);
            return 0;
        }
    }

    /**
     * 删除指定文章
     * @param id 删除文章的 id
     * @return 删除成功为 1，否则为 0
     */
    async destroyArticle(id: number) {
        try {
            const result = await this.artilceRepository.delete(id);
            return result.raw.affectedRows > 0 ? 1 : 0;
        } catch (err) {
            Logger.error(err);
            return 0;
        }
    }

    /**
     * 文章总数
     * @return 文章总数
     */
    async countArticle() {
        try {
            const count = await this.artilceRepository.count();
            return count;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }

    /**
     * 喜欢某篇文章
     * @param like 文章喜欢人数
     * @return 成功为 1，否则为 0
     */
    async likeArticle(like: number, id: number) {
        try {
            const result = await this.artilceRepository.update(id, {
                like,
            });
            return result.raw.affectedRows > 0 ? 1 : 0;
        } catch (err) {
            Logger.error(err);
            return 0;
        }
    }

    /**
     * 文章浏览量加一
     * @param view 浏览次数
     * @return {number} 浏览量增加成功为 1，否则为 0
     */
    async viewArticle(id: number, view: number) {
        try {
            console.log(view, id);
            const result = await this.artilceRepository.update(id, {
                view,
            });
            return result.raw.affectedRows > 0 ? 1 : 0;
        } catch (err) {
            Logger.error(err);
            return 0;
        }
    }

    /**
     * 文章首图上传
     * @return {array} 上传后图片的路径
     */
    async upload() {
        try {
            return [];
        } catch (err) {
            Logger.error(err);
            return [];
        }
    }
}
