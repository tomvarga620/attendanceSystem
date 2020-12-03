import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) { }

  successMessage(message: string) {
    this.snackbar.open(message, 'SUCCESS', {
      panelClass: 'successSnackBarStyle',
      duration: 5000,
      horizontalPosition: `center`,
      verticalPosition: `top`,
    });
  }

  errorMessage(message: string) {
    this.snackbar.open(message, 'ERROR', {
      panelClass: 'errorSnackBarStyle',
      duration: 5000,
      horizontalPosition: `center`,
      verticalPosition: `top`,
    });
  }
}
