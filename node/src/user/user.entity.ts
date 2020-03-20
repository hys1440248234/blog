import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column('datetime')
    createTime: Date;

    @Column('datetime')
    updateTime: Date;
}
