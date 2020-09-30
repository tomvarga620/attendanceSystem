import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  constructor(private store: Store, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (isLogged){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
