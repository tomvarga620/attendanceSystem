import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
