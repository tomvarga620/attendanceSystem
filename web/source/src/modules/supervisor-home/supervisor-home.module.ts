import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorHomeRoutingModule } from './supervisor-home-routing.module';
import { StatsComponent } from './stats/stats.component';


@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    SupervisorHomeRoutingModule
  ]
})
export class SupervisorHomeModule { }
