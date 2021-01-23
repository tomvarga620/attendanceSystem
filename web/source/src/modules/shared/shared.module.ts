import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormHttpErrorComponent } from './form-http-error/form-http-error.component';
import { MaterialModule } from '../material/material.module';
import { PageHeadingComponent } from './page-heading/page-heading.component';

@NgModule({
  declarations: [
    GenericTableComponent,
    FormErrorComponent,
    FormHttpErrorComponent, 
    PageHeadingComponent, 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule
  ],
  exports: [
    GenericTableComponent,
    FormErrorComponent,
    FormHttpErrorComponent,
    PageHeadingComponent,
  ]
})
export class SharedModule { }
