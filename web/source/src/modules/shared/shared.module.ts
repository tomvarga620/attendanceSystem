import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormHttpErrorComponent } from './form-http-error/form-http-error.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [GenericTableComponent,FormErrorComponent,FormHttpErrorComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenericTableComponent,
    FormErrorComponent,
    FormHttpErrorComponent
  ]
})
export class SharedModule { }
