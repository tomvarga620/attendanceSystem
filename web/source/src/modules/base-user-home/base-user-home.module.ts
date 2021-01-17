import { MaterialModule } from 'src/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseUserHomeRoutingModule } from './base-user-home-routing.module';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';
import { SharedModule } from '../shared/shared.module';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';


@NgModule({
  declarations: [AttendanceListComponent, RegisterAttendanceComponent, AttendanceDetailComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BaseUserHomeRoutingModule
  ]
})
export class BaseUserHomeModule { }
