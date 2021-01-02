import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {

  @Input() set tableData(data: any[]){
    this.dataSource = data;
  };
  dataSource: any[];

  @Input() tableHeaders: any[];
  get colsHeaders() {
    return this.tableHeaders.map(({key}) => key)
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.dataSource);
    console.log(this.colsHeaders);
  }

  getId(id){
    console.log(`Id = ${id}`);
  }

}
