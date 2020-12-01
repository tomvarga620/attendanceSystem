import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { LoginResult, UserService } from 'src/services/user.service';
import { Login } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // httpFormStatus: number;
  httpFormStatusError: HttpErrorResponse;

  constructor(
    private store: Store,
    private router: Router,
    private userService: UserService
  ) { }

  loginForm = new FormGroup({
    loginName: new FormControl('', [Validators.required]),
    loginPassword: new FormControl('', [Validators.required])
  });

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {

  }

  submitLoginForm(){
    this.invalidateFormFields(this.loginForm);
    if (!this.loginForm.invalid){
        this.store.dispatch(new Login(
          this.f.loginName.value,
          this.f.loginPassword.value
        ))
        .pipe(
          tap(() => this.userService.handleHttpSuccess(`User ${this.f.loginName.value} was logged`)),
          catchError((error: HttpErrorResponse) => {
            // this.httpFormStatus = error.status;
            this.httpFormStatusError = error;
            console.log(this.httpFormStatusError.status);
            return EMPTY;
          })
        )
        .subscribe(() => {
          const userRole = this.store.selectSnapshot(AuthState.userRole);
          this.router.navigate(['/']);
        });
    }
  }

  invalidateFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl){
          control.markAsDirty({ onlySelf: true});
      }
    });
  }
}
