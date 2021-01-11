import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class AttendanceRecord {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    worktime!: number;

    @Column()
    task!: string;

    @Column()
    period!: string;

    @ManyToOne(() => User, user => user.attendanceRecords)
    user!: User;

    @Column("timestamp")
    creationTime!: Date;
} 