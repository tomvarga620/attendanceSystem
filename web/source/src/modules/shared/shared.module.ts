import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GenericTableComponent
  ]
})
export class SharedModule { }
