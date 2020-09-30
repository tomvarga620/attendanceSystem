import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

const API_URL = `http://localhost:8080/`;

export class LoginResult{
  name: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login( _email: string, _password: string): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(`${API_URL}login`, {
        email: _email,
        password: _password
    }).pipe(
      catchError(err =>
          this.handleHttpResult(err)
      ));
  }

  register( _name: string, _email: string, _password: string ): Observable<void> {
    return this.httpClient.post<void>(`${API_URL}register`, {
      name: _name,
      email: _email,
      password: _password
    }).pipe(
      catchError(err =>
          this.handleHttpResult(err)
      ));
  }

  logout( _token: string ): Observable<void> {
    return this.httpClient.get(`${API_URL}logout/${_token}`)
    .pipe(mapTo(null));
  }

  handleHttpResult(error) {
    console.log(JSON.stringify(error));
    if (error instanceof HttpErrorResponse){
        console.log(error.status);
        return EMPTY
    } else {
      throwError(error);
    }
  }

}
