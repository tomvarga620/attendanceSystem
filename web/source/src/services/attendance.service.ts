import { AttendanceRecord } from './../app/entity/AttendanceRecord';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { of, throwError, Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

const API_URL = `http://localhost:3000`;

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private store: Store
  ) { }

  get apiUrl(){
    return API_URL;
  }

  saveAttendance(_id: number, _task: string, _period: string,_worktime: number): Observable<any>{
    return this.httpClient.post(`${API_URL}/saveAttendance`, {
      userId: _id,
      task: _task,
      period: _period,
      worktime: _worktime
    },{responseType: 'text'});
  }

  getAllAttendanceRecords(_id: number): Observable<AttendanceRecord[]>{
    return this.httpClient.get<AttendanceRecord[]>(`${API_URL}/getAllAttendanceRecords/${_id}`)
    .pipe(
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    );
  }

  getAttendanceRecordById(_attendanceRecordId: number): Observable<AttendanceRecord>{
    return this.httpClient.get<AttendanceRecord>(`${API_URL}/getAttendanceRecordById/${_attendanceRecordId}`)
    .pipe(
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    );
  }
  
  deleteAttendanceRecord(_attendanceRecordId: number){
    return this.httpClient.delete(`${API_URL}/deleteAttendanceRecord/${_attendanceRecordId}`,{responseType: 'text'})
    .pipe(
      tap(() => this.handleHttpSuccess(`Attendance record was deleted`)),
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    )
  }

  updateAttendanceRecord(_id: number, _worktime: number, _task: string): Observable<void>{
    return this.httpClient.post(`${API_URL}/updateAttendanceRecord`, {
      id: _id,
      worktime: _worktime,
      task: _task
    })
    .pipe(
      tap(() => this.handleHttpSuccess(`Attendance record was updated`)),
      catchError(error => {
        this.handleHttpError(error);
        return of(null);
      })
    )
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
