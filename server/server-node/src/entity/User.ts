import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

/*     @Column()
    role!: string; */

    @OneToOne((type) => Role)
    @JoinColumn()
    role!: Role;
}