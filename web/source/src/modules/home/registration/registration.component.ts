import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  registerForm = new FormGroup({
    regName: new FormControl('', [Validators.required]),
    regEmail: new FormControl('', [Validators.email, Validators.required]),
    regPassword: new FormControl('', [Validators.required]),
    regPasswordRepeat: new FormControl('', Validators.required)
  });

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {}

  registerUser(){
    console.log(`registerUser function works`);
    this.validateFormFields(this.registerForm);
    if (!this.registerForm.invalid){
      this.userService.register(
        this.f.regName.value,
        this.f.regEmail.value,
        this.f.regPassword.value
      ).subscribe( () => this.router.navigate(['/']));
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

}
