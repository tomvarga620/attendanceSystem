import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisorHomeRoutingModule } from './supervisor-home-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegistrationComponent, UserListComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SupervisorHomeRoutingModule
  ]
})
export class SupervisorHomeModule { }
