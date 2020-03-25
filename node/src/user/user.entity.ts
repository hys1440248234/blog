import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 30})
    username: string;

    @Column('int')
    age: number;

    @Column('text')
    password: string;

    @Column('varchar', {length: 10})
    roles: string;

    @Column('varchar', {length: 200})
    avatar: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createTime: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updateTime: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updateTime = new Date();
    }
}
