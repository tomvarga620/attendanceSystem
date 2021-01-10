import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseUserHomeRoutingModule } from './base-user-home-routing.module';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AttendanceListComponent, RegisterAttendanceComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseUserHomeRoutingModule
  ]
})
export class BaseUserHomeModule { }
