import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormHttpErrorComponent } from './form-http-error/form-http-error.component';
import { MaterialModule } from '../material/material.module';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { EditAttendanceDialogComponent } from './edit-attendance-dialog/edit-attendance-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GenericTableComponent,
    FormErrorComponent,
    FormHttpErrorComponent, 
    PageHeadingComponent, EditAttendanceDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GenericTableComponent,
    FormErrorComponent,
    FormHttpErrorComponent,
    PageHeadingComponent
  ]
})
export class SharedModule { }
