import { AuthState } from 'src/store/auth/auth.state';
import { AttendanceService } from './../../../services/attendance.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CanDeactivateComponent } from 'src/guards/deactivate.guard';
import { ConfirmDialogServiceService } from 'src/services/confirm-dialog-service.service';

@Component({
  selector: 'app-register-attendance',
  templateUrl: './register-attendance.component.html',
  styleUrls: ['./register-attendance.component.css']
})
export class RegisterAttendanceComponent implements OnInit, CanDeactivateComponent {

  httpFormStatusError: HttpErrorResponse;
  userId: number;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
    private router: Router,
    private dialogService: ConfirmDialogServiceService) {}

  registerAttendance = new FormGroup({
    task: new FormControl('', [Validators.required]),
    period: new FormControl('',[Validators.required]),
    worktime: new FormControl('', [Validators.required])
  });

  get f() { return this.registerAttendance.controls; }

  ngOnInit(): void {}

  submitAttendance(){
    this.validateFormFields(this.registerAttendance);
    if (!this.registerAttendance.invalid){
      this.attendanceService.saveAttendance(
        this.store.selectSnapshot(AuthState.userId),
        this.f.task.value,
        this.f.period.value,
        this.f.worktime.value
      ).pipe(
        tap(() => this.attendanceService.handleHttpSuccess(`Attendance record has been sent`)),
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          this.httpFormStatusError = error;
          return EMPTY;
        })
      ).subscribe(() => this.router.navigate(['']));
    }
  }

  validateFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl){
          control.markAsDirty({ onlySelf: true});
      }
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.f.task.value && this.f.period.value && this.f.worktime.value) {
      return true;
    }

    if (!this.f.task.value && !this.f.period.value && !this.f.worktime.value) {
      return true;
    }

    return this.openDialog();
  }

  openDialog() {
    const options = {
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Leave',
      messageText: 'Are you sure you want leave?',
      titleText:'Leave action'
    };
    this.dialogService.open(options);
    return this.dialogService.dialogRef.afterClosed();
  }

}
