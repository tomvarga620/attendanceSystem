import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { LoginResult, UserService } from 'src/services/user.service';
import { Login } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  httpFormStatus: number;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  loginForm = new FormGroup({
    loginName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    loginPassword: new FormControl('', [Validators.required])
  });

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {

  }

  submitLoginForm(){
    console.log(`submitLoginForm function works`);
    this.validateFormFields(this.loginForm);
    if (!this.loginForm.invalid){
        this.store.dispatch(new Login(
          this.f.loginName.value,
          this.f.loginPassword.value
        ))
        .pipe(catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          this.httpFormStatus = error.status;
          return EMPTY;
        }))
        .subscribe(() => {
          const userRole = this.store.selectSnapshot(AuthState.userRole);
          this.navigateToRouteByRole(userRole);
        });
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

  navigateToRouteByRole(userRole: string){
    switch (userRole){
      case 'ADMIN': {
        this.router.navigate(['/adminboard']);
        break;
     }
     case 'USER': {
        this.router.navigate(['/userboard']);
        break;
     }
    }
  }

}
