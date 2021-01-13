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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialogService: DialogServiceService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.sort.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.dataSource.sort = this.sort;
  }


  ngAfterViewInit(): void {}


  getDataFromRow(data){
    console.log(`data = ${data}`);
  }

  deleteRow(rowId: number){
    this.openDialog();
  }


  openDialog(){
    console.log("test");
    const options = {
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, delete',
      messageText: 'Are you sure you want to delete this row?',
      titleText:''
    };
    
    this.dialogService.open(options);
        
    this.dialogService.confirmed().subscribe(confirmed => {
       if (confirmed) {
            console.log("confirmed");
          }
    });
  }

}
