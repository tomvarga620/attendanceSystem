import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserService } from 'src/services/user.service';
import { catchError, map, mapTo, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { Logout } from 'src/store/auth/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store, private service: UserService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(state => state.userAuth.token);
    const isLogged = !!token;
    const isApiUrl = request.url.startsWith(this.service.apiUrL);

    if (isLogged && isApiUrl){
      request = request.clone({
        setHeaders: {
          Authorizations: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 403){
            this.store.dispatch(new Logout());
            return throwError(`invalid token`);
        }
        return throwError(err);
      }
    )
  );
}

}
