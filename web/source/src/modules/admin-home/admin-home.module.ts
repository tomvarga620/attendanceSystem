import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { UserUiModule } from '../user-ui/user-ui.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    AdminUsersComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UserUiModule,
    CommonModule,
    MaterialModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
