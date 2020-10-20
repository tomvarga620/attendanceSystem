import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserTemp {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    role!: string;
}