import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormHttpErrorComponent } from './form-http-error/form-http-error.component';

@NgModule({
  declarations: [FormErrorComponent, FormHttpErrorComponent],
  exports: [
    FormErrorComponent, FormHttpErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormsValidationModule { }
