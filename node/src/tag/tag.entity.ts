import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeUpdate } from 'typeorm';
import { Article } from 'src/article/article.entity';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 20})
    name: string;

    @Column('varchar', {length: 20})
    alias: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createTime: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updateTime: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updateTime = new Date();
    }

    @ManyToOne(type => Article, article => article.tags)
    article: Article;
}
