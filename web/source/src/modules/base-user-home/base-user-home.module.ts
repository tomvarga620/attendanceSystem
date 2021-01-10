import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseUserHomeRoutingModule } from './base-user-home-routing.module';
import { TestComponent } from './test/test.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';


@NgModule({
  declarations: [TestComponent, AttendanceListComponent, RegisterAttendanceComponent],
  imports: [
    CommonModule,
    BaseUserHomeRoutingModule
  ]
})
export class BaseUserHomeModule { }
