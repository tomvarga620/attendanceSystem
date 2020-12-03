import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendanceRecord } from "./AttendanceRecord";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @OneToOne((type) => Role)
    @JoinColumn()
    role!: Role;

    @OneToMany(() => AttendanceRecord, record => record.user)
    attendanceRecords!: AttendanceRecord[]
}