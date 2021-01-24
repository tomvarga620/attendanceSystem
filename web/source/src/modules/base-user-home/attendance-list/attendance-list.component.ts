import { RecordTypes } from './../../../app/helpers/RecordTypes';
import { Store } from '@ngxs/store';
import { AttendanceService } from './../../../services/attendance.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/User';
import { AttendanceRecord } from 'src/app/entity/AttendanceRecord';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit, AfterViewInit {

  dataSource: AttendanceRecord[];
  displayedColumns: string[] = ['username', 'role'];
  userId: number;
  sampleHeading = "Attendance Records";
  type = RecordTypes.Attendance;

  TABLE_HEADERS_DATA = [
    { key: "id", displayName: "Record Id" },
    { key: "task", displayName: "Task"},
    { key: "period", displayName: "Date" },
    { key: "worktime", displayName: "Worktime" },
    { key: "creationTime", displayName: "Created at"},
    { key: "actionMenu", displayName: "Action"}
  ];

  constructor(
    private attendanceService: AttendanceService,
    private store: Store) {
    this.userId = this.store.selectSnapshot<number>(state => state.userAuth.id);
    console.log(this.userId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.attendanceService.getAllAttendanceRecords(this.userId).subscribe((attendanceRecords: AttendanceRecord[]) => {
      this.dataSource = attendanceRecords;
    });
  }


}
