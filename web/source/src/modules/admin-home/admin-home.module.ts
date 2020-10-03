import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsValidationModule } from '../formsvalidation/formsvalidation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeRoutingModule } from './admin-home-routing.module';


@NgModule({
  declarations: [
    TestComponent,
    RegistrationComponent,  ],
  imports: [
    FormsValidationModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
