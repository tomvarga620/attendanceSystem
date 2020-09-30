import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;

  isLogged: boolean;

  constructor(private store: Store, private router: Router) {
      // this.isLogged = this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  ngOnInit() {
    this.store.select(state => !!state.userAuth.token).subscribe( (value) => {
      this.isLogged = value;
    });
  }

  logoutUser(){
    this.store.dispatch(new Logout()).subscribe( () => {
      this.router.navigate(['/']);
    });
  }
}
