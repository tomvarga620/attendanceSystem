import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendanceRecord } from "./AttendanceRecord";
import { Role } from "./Role";
import { SupervisorToUserRelation } from "./SupervisorToUserRelation";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @OneToOne((type) => Role,{ cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    role!: Role;

    @OneToMany(() => AttendanceRecord, record => record.user, { eager: true })
    attendanceRecords!: AttendanceRecord[]

    @OneToOne(() => SupervisorToUserRelation)
    SupervisorToUser!: SupervisorToUserRelation[];

    @Column("timestamp")
    creationTime!: Date;
}