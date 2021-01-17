import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'myAttendance', component: AttendanceListComponent},
  {path: '', redirectTo: 'myAttendance', pathMatch: 'full' },
  {path: 'registerAttendance', component: RegisterAttendanceComponent},
  {path: 'myAttendance/attendance/:id', component: AttendanceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseUserHomeRoutingModule { }
