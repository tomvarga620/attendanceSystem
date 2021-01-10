import { AuthState } from './../store/auth/auth.state';
import {Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { Logout, UserAuth } from 'src/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAdmin: boolean;
  isSupervisor: boolean;
  isBaseUser: boolean;

  @ViewChild(MatSidenav) sideNav: MatSidenav;
  @Select(AuthState.isAdmin) isAdmin$: Observable<boolean>;
  @Select(AuthState.isSupervisor) isSupervisor$: Observable<boolean>;
  @Select(AuthState.isBaseUser) isBaseUser$: Observable<boolean>;

  constructor(private router: Router, private store: Store, private actions$: Actions) {
    this.actions$.pipe(ofActionSuccessful(Logout)).subscribe(() => {
        this.sideNav.close();
    });
  }

  ngOnInit(): void {
    this.isAdmin$.subscribe((value) => {
        this.isAdmin = value;
    });

    this.isSupervisor$.subscribe((value) => {
        this.isSupervisor = value;
    })

    this.isBaseUser$.subscribe((value) => {
        this.isBaseUser = value;
    })

  }

}
