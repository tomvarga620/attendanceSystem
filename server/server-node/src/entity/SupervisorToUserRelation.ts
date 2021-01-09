import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupervisorToUserRelation {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    supervisorId!: number;

    @Column()
    userId!: number;
}