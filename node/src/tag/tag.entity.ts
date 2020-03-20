import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from 'src/article/article.entity';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 20})
    name: string;

    @Column('varchar', {length: 20})
    alias: string;

    @Column('datetime')
    createTime: Date;

    @Column('datetime')
    updateTime: Date;

    @ManyToOne(type => Article, article => article.tags)
    article: Article;
}
