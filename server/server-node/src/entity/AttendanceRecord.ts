import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class AttendanceRecord {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("timestamp")
    arrivalTime!: Date;

    /*@Column("timestamp")
    departureTime!: Date;*/

    @ManyToOne(() => User, user => user.attendanceRecords)
    user!: User;
} 