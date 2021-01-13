import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminUsersComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
