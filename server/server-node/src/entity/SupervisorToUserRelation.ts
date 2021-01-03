import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupervisorToUserRelation {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    superVisorId!: number;

    @Column()
    userId!: number;
}