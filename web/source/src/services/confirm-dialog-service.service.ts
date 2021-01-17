import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GenericDialogComponent } from 'src/modules/shared/generic-dialog/generic-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogServiceService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<GenericDialogComponent>;

  public open(dialogOptions){
    this.dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        cancelButtonText: dialogOptions.cancelButtonText,
        confirmButtonText: dialogOptions.confirmButtonText,
        messageText: dialogOptions.messageText,
        titleText: dialogOptions.titleText
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(result => result))
  }

}
