import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

const API_URL = `http://localhost:3000/`;

export class LoginResult{
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private snackbarService: SnackbarService) { }

  login( _name: string, _password: string): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(`${API_URL}login`, {
        name: _name,
        password: _password
    });
  }

  register( _name: string, _email: string, _password: string ): Observable<void> {
    return this.httpClient.post<void>(`${API_URL}registration`, {
      email: _email,
      name: _name,
      password: _password
    });
  }

  logout( _token: string ): Observable<void> {
    return this.httpClient.get(`${API_URL}logout/?token=${_token}`)
    .pipe(
      tap(() => this.handleHttpSucces(`Logout was successful`)),
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    );
  }

  handleHttpError(error) {
    console.log(JSON.stringify(error));
    if (error instanceof HttpErrorResponse){
        console.log(`Error Response = ${error.status}`);
        this.snackbarService.errorMessage(error.message);
        return EMPTY;
    } else {
      throwError(error);
    }
  }

  handleHttpSucces(message: string){
    this.snackbarService.successMessage(message);
  }

}
