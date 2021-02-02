import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { AttendanceService } from './../../../services/attendance.service';
import { RecordTypes } from './../../../app/helpers/RecordTypes';
import { DialogService } from 'src/services/dialog-service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit,AfterViewInit {

  @Input() set tableData(data: any[]){
    this.dataSource = new MatTableDataSource<any>(data);
  };
  dataSource: MatTableDataSource<any>;

  @Input() tableHeaders: any[];
  get colsHeaders() {
    return this.tableHeaders.map(({key}) => key)
  }

  @Input() dataType: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService, 
    private attendanceService: AttendanceService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    /*const sortState: Sort = {active: 'name', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);*/

  }

  ngAfterViewInit() {}

  sortData(sort: Sort){
    if (!this.sort.active || this.sort.direction === '') {}
    else {
      let arrayOfColumnNames = Object.keys(this.dataSource.data[0]);
      let sortBy = "";
      arrayOfColumnNames.forEach((value => {
        if(value == sort.active){
          sortBy = value;
        }
      }))
    }
  }

  editRow(rowData: any){
    this.updateAttendanceDialog(rowData);
  }

  deleteRow(id: number){
    this.deleteDialog(id);
  }

  detailRow(id: number){
    this.navigateByDataType(this.dataType,id);
  }
  
  deleteByDataType(type: RecordTypes, id: number){
    switch(type){
      case RecordTypes.User : {
        const index = this.dataSource.data.indexOf(id);
        this.userService.deleteUser(id).subscribe();
        this.dataSource.data.splice(index,1);
        this.dataSource._updateChangeSubscription();
        break;
      }
      case RecordTypes.Attendance : {
        const index = this.dataSource.data.indexOf(id);
        this.attendanceService.deleteAttendanceRecord(id).subscribe();
        this.dataSource.data.splice(index,1);
        this.dataSource._updateChangeSubscription();
        break;
      }
    }
  }

  updateAttendance(value){
    this.attendanceService.updateAttendanceRecord(value.id,value.worktime,value.task,value.period).subscribe();
    const index = this.dataSource.data.indexOf(value.id);
    this.dataSource.data[index] = {
      id: value.id,
      worktime: value.worktime,
      task: value.task,
      period: value.period
    }
    this.dataSource._updateChangeSubscription();
  }

  navigateByDataType(type: RecordTypes, id: number){
    switch(type){
      case RecordTypes.User : {
        this.router.navigate([`/supervisor/usersList/user/${id}`]);
        break;
      }
      case RecordTypes.Attendance : {
        this.router.navigate([`/user/myAttendance/attendance/${id}`]);
        break;
      }
    }
  }

  deleteDialog(id: number){
    const options = {
      cancelButtonText: 'CANCEL',
      confirmButtonText: 'YES, DELETE',
      messageText: 'Are you sure you want to delete this row?',
      titleText:'Delete'
    };
    this.dialogService.openConfirmDialog(options);
    this.dialogService.confirmDialogConfirmed().subscribe(confirmed => {
       if (confirmed) this.deleteByDataType(this.dataType,id);
    });
  }

  updateAttendanceDialog(rowdata: any){
    const rowDataWithTypes =  Object.keys(rowdata).map((key) => {
      let properties = {
        label: key,
        value: rowdata[key],
        type: this.checkIfValueIsDate(rowdata[key]) ? "date" : typeof rowdata[key]
      }
      return properties;
    });

    const options = {
      cancelButtonText: 'CANCEL',
      confirmButtonText: 'UPDATE',
      titleText:'Attendance Update',
      inputData: rowDataWithTypes.slice(0,4)
    };

    this.dialogService.openAttendanceEdit(options);
    this.dialogService.confirmInputsConfirmed().subscribe(value => {
      if(value != false){
        this.updateAttendance(value)
      }
    });
  }

  checkIfValueIsDate(dateString){
    if(isNaN(dateString)){ 
      var dt=new Date(dateString);
      if(isNaN(dt.getTime())){ 
        return false; 
      }else{
        return true; 
      }
    } else {
      return false;
    }
  }

}
