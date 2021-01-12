import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private store: Store, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole: string = this.store.selectSnapshot(AuthState.userRole);
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      this.redirectByRole(userRole);
      return false;
    } else {
      return true;
    }
  }

  redirectByRole(userRole: string){
    switch (userRole){
      case 'ADMIN': {
        this.router.navigate([`/admin`]);
        break;
      }
      case 'USER': {
        this.router.navigate([`/user/myAttendance`]);
        break;
      }
      case 'SUPERVISOR': {
        this.router.navigate([`/supervisor`]);
      }
    }
  }

}
