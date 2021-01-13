import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

const API_URL = `http://localhost:3000`;

export class LoginResult {
  token: string;
  role: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private store: Store) {}

  get apiUrl(){
    return API_URL;
  }

  login( _username: string, _password: string): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(`${API_URL}/login`, {
        username: _username,
        password: _password
    });
  }

  register(_username: string, _password: string , _role: string, _id: number): Observable<any> {
    return this.httpClient.post(`${API_URL}/createUser`, {
      supervisorId: _id,
      username: _username,
      password: _password,
      role: _role
    },{responseType: 'text'});
  }

  logout( _token: string ): Observable<void> {
    return this.httpClient.get(`${API_URL}/logout/?token=${_token}`, {responseType: 'text'})
    .pipe(
      tap(() => this.handleHttpSuccess(`Logged out`)),
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    );
  }

  getUsers(_id: number): Observable<any> {
    return this.httpClient.post(`${API_URL}/allUsers`, {
      supervisorId: _id
    })
    .pipe(
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    );
  }

  deleteUser(_userId: number, _username: string): Observable<void> {
    return this.httpClient.delete(`${API_URL}/deleteUser/${_userId}`)
    .pipe(
      tap(() => this.handleHttpSuccess(`User ${_username} was deleted`)),
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    )
  }

  updateUser(){}

  handleHttpError(error) {
    console.log(JSON.stringify(error));
    if (error instanceof HttpErrorResponse && error.status !== 0 ){
        console.log(`Error Response = ${error.status}`);
        this.snackbarService.errorMessage(error.message);
        return EMPTY;
    } else {
      this.snackbarService.errorMessage('Server is offline');
      throwError(error);
    }
  }

  handleHttpSuccess(message: string){
    this.snackbarService.successMessage(message);
  }
}
