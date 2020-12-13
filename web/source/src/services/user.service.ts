import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/entity/User';
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
    private store: Store) { }

  get apiUrL(){
    return API_URL;
  }

  login( _username: string, _password: string): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(`${API_URL}/login`, {
        username: _username,
        password: _password
    });
  }

  register(_username: string, _password: string , _role): Observable<void> {
    return this.httpClient.post<void>(`${API_URL}/createUser`, {
      username: _username,
      password: _password,
      role: _role
    });
  }

  logout( _token: string ): Observable<void> {
    return this.httpClient.get(`${API_URL}/logout/?token=${_token}`, {responseType: 'text'})
    .pipe(
      tap(() => this.handleHttpSuccess(`Logout was successful`)),
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    );
  }

  getUsers(_id: number): Observable<User[]> {
    return this.httpClient.post(`${API_URL}/allUsers`, {
      id: _id
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

  updateUser(){
    
  }

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
