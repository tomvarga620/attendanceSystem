import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    roleName!: string;
}