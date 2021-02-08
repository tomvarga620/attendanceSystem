import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, HostListener, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-attendance-dialog',
  templateUrl: './edit-attendance-dialog.component.html',
  styleUrls: ['./edit-attendance-dialog.component.css']
})
export class EditAttendanceDialogComponent implements OnInit {

  httpFormStatusError: HttpErrorResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelButtonText: string,
    confirmButtonText: string,
    titleText: string,
    inputData: any,
  }, 
  private mdDialogRef: MatDialogRef<EditAttendanceDialogComponent>) { }

  formValues = this.data.inputData;
  editAttendanceForm = new FormGroup({});

  ngOnInit(): void {
    console.log(this.formValues);
    let newGroup = {};
    this.formValues.forEach(element => {
      newGroup[element.label] = new FormControl(element.value, Validators.required);
    });
    this.editAttendanceForm = new FormGroup(newGroup);
  }

  get formProperties() { return this.editAttendanceForm.value; }

  public cancel() {
    this.close([]);
  }

  public close(value) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(this.formProperties);
  }

  @HostListener("keydown.esc") 
  public onEsc() {
    this.close([]);
  }

}
