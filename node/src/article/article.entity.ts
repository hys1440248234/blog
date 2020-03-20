import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tag } from 'src/tag/tag.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    title: string;

    @Column('text')
    summary: string;

    @Column('text')
    contentText: string;

    @Column('text')
    content: string;

    @Column('varchar', {length: 200})
    imageUrl: string;

    @Column('int')
    view: number;

    @Column('int')
    like: number;

    @Column('datetime')
    createTime: Date;

    @Column('datetime')
    updateTime: Date;

    @OneToMany(type => Tag, tag => tag.article)
    tags: Tag[];
}
