import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { AttendanceService } from './../../../services/attendance.service';
import { RecordTypes } from './../../../app/helpers/RecordTypes';
import { ConfirmDialogServiceService } from 'src/services/confirm-dialog-service.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

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
    private dialogService: ConfirmDialogServiceService, 
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
    console.log(sort);
    let arrayOfColumnNames = Object.keys(this.dataSource.data[0]);
    let valueSortBy = "";
    arrayOfColumnNames.forEach((value => {
      if(value == sort.active){
        valueSortBy = value;
      }
    }))

    switch(sort.direction){
        case "asc": {
          this.dataSource.data = _.sortBy(this.dataSource.data,valueSortBy)
          this.dataSource._updateChangeSubscription();
          break;
        }
        case "desc": {
          this.dataSource.data = _.sortBy(this.dataSource.data,valueSortBy).reverse();
          this.dataSource._updateChangeSubscription();
          break;
        }
        default: {
          this.dataSource.data = _.sortBy(this.dataSource.data,"id")
          this.dataSource._updateChangeSubscription();
        }
    }
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
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
       if (confirmed) this.deleteByDataType(this.dataType,id);
    });
  }
}
