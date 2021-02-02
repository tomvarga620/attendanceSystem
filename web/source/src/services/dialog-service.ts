import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GenericConfirmDialogComponent } from 'src/modules/shared/generic-confirm-dialog/generic-confirm-dialog.component';
import { EditAttendanceDialogComponent } from 'src/modules/shared/edit-attendance-dialog/edit-attendance-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialogRef: MatDialogRef<GenericConfirmDialogComponent>;
  inputsDialog: MatDialogRef<EditAttendanceDialogComponent>;

  public openConfirmDialog(dialogOptions){
    this.confirmDialogRef = this.dialog.open(GenericConfirmDialogComponent, {
      data: {
        cancelButtonText: dialogOptions.cancelButtonText,
        confirmButtonText: dialogOptions.confirmButtonText,
        messageText: dialogOptions.messageText,
        titleText: dialogOptions.titleText
      }
    });
  }

  public confirmDialogConfirmed(): Observable<any> {
    return this.confirmDialogRef.afterClosed().pipe(take(1), map(result => result))
  }

  public openAttendanceEdit(dialogOptions){
    this.inputsDialog = this.dialog.open(EditAttendanceDialogComponent, {
      data: {
        cancelButtonText: dialogOptions.cancelButtonText,
        confirmButtonText: dialogOptions.confirmButtonText,
        titleText: dialogOptions.titleText,
        inputData: dialogOptions.inputData
      }
    });
  }

  public confirmInputsConfirmed(): Observable<any> {
    return this.inputsDialog.afterClosed().pipe(take(1), map(result => result))
  }

}
