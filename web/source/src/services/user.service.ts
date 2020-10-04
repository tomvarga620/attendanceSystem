import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

const API_URL = `http://localhost:3000/`;

export class LoginResult{
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login( _name: string, _password: string): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(`${API_URL}login`, {
        name: _name,
        password: _password
    }).pipe(
/*       tap(() => console.log(`successful login`)),
      catchError(err =>
          this.handleHttpResult(err)
      ) */
      );
  }

  register( _name: string, _email: string, _password: string ): Observable<void> {
    return this.httpClient.post<void>(`${API_URL}registration`, {
      email: _email,
      name: _name,
      password: _password
    }).pipe(
      tap(() => console.log(`successful registration`)),
      catchError(err =>
          this.handleHttpResult(err)
      ));
  }

  logout( _token: string ): Observable<void> {
    return this.httpClient.get(`${API_URL}logout/?token=${_token}`)
    .pipe(mapTo(null));
  }

  handleHttpResult(error) {
    console.log(JSON.stringify(error));
    if (error instanceof HttpErrorResponse){
        console.log(`Error Response = ${error.status}`);
        return EMPTY;
    } else {
      throwError(error);
    }
  }

}
