import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate, CanLoad {

  constructor(private store: Store, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url = state.url;
    return this.checkLogin(route, url);
  }

  canLoad(route: Route, segments: UrlSegment[])
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
  }

  checkLogin(route: ActivatedRouteSnapshot, url: any): boolean {
      const isLogged = this.store.selectSnapshot(AuthState.isAuthenticated);
      if (isLogged){
        const userRole = this.store.selectSnapshot(AuthState.userRole);
        if (route.data.role && route.data.role.indexOf(userRole) === -1) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
}
