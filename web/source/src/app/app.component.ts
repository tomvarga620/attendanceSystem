import {Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { Logout } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAdmin: boolean;

  @ViewChild(MatSidenav) sideNav: MatSidenav;
  @Select(AuthState.isAdmin) isAdmin$: Observable<boolean>;

  constructor(private router: Router, private store: Store, private actions$: Actions) {
    this.actions$.pipe(ofActionSuccessful(Logout)).subscribe(() => {
        this.sideNav.close();
    });
  }

  ngOnInit(): void {
    this.isAdmin$.subscribe( (value) => {
        this.isAdmin = value;
    });
  }

}
