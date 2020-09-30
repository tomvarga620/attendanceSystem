import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) { }

  loginForm = new FormGroup({
    loginEmail: new FormControl('', [Validators.email, Validators.required]),
    loginPassword: new FormControl('', [Validators.required])
  });

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {}

  submitLoginForm(){
    console.log(`submitLoginForm function works`);
    if (!this.loginForm.invalid){
        this.store.dispatch(new Login(
          this.f.loginEmail.value,
          this.f.loginPassword.value
        )).subscribe( () => {
          if (this.store.selectSnapshot(AuthState.token)){
            this.router.navigate(['/']);
          }
        });
    }
  }

}
