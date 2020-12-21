import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';


@NgModule({
  declarations: [GenericTableComponent, GenericDialogComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
