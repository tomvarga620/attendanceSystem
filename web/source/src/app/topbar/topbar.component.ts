import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Logout, UserAuth } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;

  isLogged: boolean;
  username: string;

  @Select(AuthState.username) username$: Observable<string>;

  constructor(private store: Store, private router: Router, private actions$: Actions) {
    this.actions$.pipe(ofActionSuccessful(Logout)).subscribe(() => {
        this.router.navigate(['login']);
    });
  }

  ngOnInit() {
    this.store.select(state => !!state.userAuth.token).subscribe((value) => {
      this.isLogged = value;
    });

    this.username$.subscribe((value) => {
      this.username = value;
    })
  }

  logoutUser(){
    this.store.dispatch(new Logout());
  }
}
