import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseUserHomeRoutingModule } from './base-user-home-routing.module';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    BaseUserHomeRoutingModule
  ]
})
export class BaseUserHomeModule { }
