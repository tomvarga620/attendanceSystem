import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { AttendanceService } from './../../../services/attendance.service';
import { RecordTypes } from './../../../app/helpers/RecordTypes';
import { DialogServiceService } from 'src/services/dialog-service.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialogService: DialogServiceService, 
    private attendanceService: AttendanceService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.sort.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {}

  clickOnlyOnMenu(e: any){
    e.stopPropagation();
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
        this.router.navigate[''];
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
