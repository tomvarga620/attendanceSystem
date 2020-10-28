import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Logout } from 'src/store/auth/auth.actions';
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

  @Select(AuthState.isAdmin) isAdmin$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.select(state => !!state.userAuth.token).subscribe( (value) => {
      this.isLogged = value;
    });
  }

  logoutUser(){
    this.store.dispatch(new Logout())
    .subscribe( () => {
      this.router.navigate(['/login']);
    });
  }
}
