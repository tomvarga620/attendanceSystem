import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Roles } from 'src/app/entity/Roles';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  httpFormStatus: number;
  roles: string[] = Roles.roleArray();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  registerForm = new FormGroup({
    regName: new FormControl('', [Validators.required]),
    regSelect: new FormControl('', [Validators.required]),
    regPassword: new FormControl('', [Validators.required]),
    regPasswordRepeat: new FormControl('', Validators.required)
  }, this.validatePasswordMatch);

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.roles.forEach((role) => console.log(role));
  }

  registerUser(){
    console.log(`registerUser function works`);
    this.validateFormFields(this.registerForm);
    if (!this.registerForm.invalid){
      this.userService.register(
        this.f.regName.value,
        this.f.regPassword.value,
        (this.f.regSelect.value as string).toUpperCase()
      ).pipe(
        tap(() => this.userService.handleHttpSuccess(`User ${this.f.regName.value} was registered`)),
        catchError((error: HttpErrorResponse) => {
          this.httpFormStatus = error.status;
          return EMPTY;
        })
      ).subscribe(() => this.router.navigate(['/adminboard']));
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

  validatePasswordMatch(fieldControl: FormControl){
    if (fieldControl.get('regPassword').value === fieldControl.get('regPasswordRepeat').value){
        fieldControl.get('regPasswordRepeat').setErrors(null);
        return null;
    }else {
      fieldControl.get('regPasswordRepeat').setErrors({ passwordsMatchFail: `Passwords does not match`});
      return ({ passwordsMatchFail: `Passwords does not match`});
    }
  }
}
