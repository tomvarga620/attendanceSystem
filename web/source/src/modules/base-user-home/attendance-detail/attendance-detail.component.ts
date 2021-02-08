import { AttendanceRecord } from 'src/app/entity/AttendanceRecord';
import { AttendanceService } from './../../../services/attendance.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.css']
})
export class AttendanceDetailComponent implements OnInit {

  attendanceRecordId: any;
  attendanceRecordHeading: string;

  constructor(
    private route: ActivatedRoute,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void {
    this.attendanceRecordId = this.route.snapshot.paramMap.get('id');
    this.attendanceService.getAttendanceRecordById(this.attendanceRecordId).subscribe((value: AttendanceRecord) => {
      console.log(value);
      this.attendanceRecordHeading = `Attendance from ${value.period}`;
    });
  }

}
