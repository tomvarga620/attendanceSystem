import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TestComponent } from './test/test.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsvalidationModule } from '../formsvalidation/formsvalidation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TestComponent,
    RegistrationComponent,  ],
  imports: [
    FormsvalidationModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
