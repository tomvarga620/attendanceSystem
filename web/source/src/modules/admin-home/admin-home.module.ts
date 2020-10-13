import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsValidationModule } from '../formsvalidation/formsvalidation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { UserUiModule } from '../user-ui/user-ui.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    AdminUsersComponent,
  ],
  imports: [
    FormsValidationModule,
    FormsModule,
    ReactiveFormsModule,
    UserUiModule,
    CommonModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
