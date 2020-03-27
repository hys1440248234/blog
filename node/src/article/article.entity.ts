import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeUpdate } from 'typeorm';
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

    @Column({type: 'int', default: 0})
    view: number;

    @Column({type: 'int', default: 0})
    like: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createTime: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updateTime: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updateTime = new Date();
    }

    @OneToMany(type => Tag, tag => tag.article)
    tags: Tag[];
}
