import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserService } from 'src/services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store, private service: UserService) {}

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

    return next.handle(request);
  }
}
