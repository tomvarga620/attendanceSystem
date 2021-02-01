import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-inputs-dialog',
  templateUrl: './generic-inputs-dialog.component.html',
  styleUrls: ['./generic-inputs-dialog.component.css']
})
export class GenericInputsDialogComponent implements OnInit {

  httpFormStatusError: HttpErrorResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelButtonText: string,
    confirmButtonText: string,
    titleText: string,
    inputData: any,
  }, private mdDialogRef: MatDialogRef<GenericInputsDialogComponent>) { }

  genericForm = new FormGroup({});

  ngOnInit(): void {
    let newGroup = {};
    Object.entries(this.data.inputData).forEach((value => {
        newGroup[value[0]] = new FormControl(value[1],Validators.required);
    }))
    this.genericForm = new FormGroup(newGroup);
    console.log(this.genericForm.value)
  }

  get formProperties() { return this.genericForm.controls; }

  public cancel() {
    this.close(false);
  }

  public close(value) {
    this.mdDialogRef.close(this.formProperties);
  }

  public confirm() {
    this.close(this.data.inputData);
  }

  @HostListener("keydown.esc") 
  public onEsc() {
    this.close(this.data.inputData);
  }

}
