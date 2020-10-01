import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class LoginAccessGuard implements CanActivate {

  constructor(private store: Store, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
